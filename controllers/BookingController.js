const Model = require('../models/AirfieldsSpacesBookingModel.js');
const StripeIntentModel = require('../models/StripeIntentModel.js');
const AirfieldsBankModel = require('../models/AirfieldsBankModel.js');
const StripeService = require('../services/StripeService.js');

module.exports = class EquipmentTypeController{
    constructor(req, res, next, action){
        this.model = new Model();
        res.data._module = 'bookings';
        res.data._name = 'Bookings';

        this[action](req, res, next);
    }

    async index(req, res){
        res.data.airfieldId = req.params.airfieldId;
        res.data.items = await this.model.getUserAirfieldBookings(req.user.id, res.data.airfieldId);

        return res.render(`${res.data._module}/index`, res.data);
    }

    async view(req, res){
        const airfieldsBankModel = new AirfieldsBankModel();
        res.data.airfieldsSpacesBookingId = req.params.airfieldsSpacesBookingId;
        res.data.airfieldId = req.params.airfieldId;
        res.data.item = await this.model.getById(res.data.airfieldsSpacesBookingId);
        res.data.airfieldBank = await airfieldsBankModel.getByAirfieldId(res.data.airfieldId);
        res.data.submitButtons = res.data.item.status === Model._STATUSES['pending'];
        res.data.statusMessage = Model._STATUS_MESSAGES[res.data.item.status];

        return res.render(`${res.data._module}/view`, res.data);
    }

    async submit(req, res){
        const {submit} = req.body;
        res.data.airfieldId = req.params.airfieldId;
        res.data.airfieldsSpacesBookingId = req.params.airfieldsSpacesBookingId;

        res.data.item = await this.model.getByAirfieldId(res.data.airfieldsSpacesBookingId, res.data.airfieldId);
        if(!res.data.item || res.data.item.status !== Model._STATUSES['pending'])
            return res.redirect(`/${res.data._module}/${res.data.airfieldId}`);

        const status = Model._STATUSES[submit];
        if(status === undefined)
            return res.redirect(`/${res.data._module}/${res.data.airfieldId}`);

        const stripe = new StripeService();
        const stripeIntentModel = new StripeIntentModel();

        const stripePaymentIntent = await stripeIntentModel.getByAirfieldsSpacesBookingId(res.data.airfieldsSpacesBookingId);

        try {
            await this.model.startTransaction('READ COMMITTED');

            await this.model.update(res.data.airfieldsSpacesBookingId, {
                status: status
            });

            await stripeIntentModel.update(stripePaymentIntent.id, {
                status: StripeIntentModel._STATUSES[submit]
            });

            const intent = await stripe._call(`${submit}Intent`, [stripePaymentIntent['payment_intent_id']]);
            if(!intent.success){
                res.data.errorMessage = intent.error.message;
                await this.model.rollback();
                return res.redirect(`/${res.data._module}/${res.data.airfieldId}`);
            }

            await this.model.commit();
        }catch (e) {

            console.log(e);

            await this.model.rollback();
        }

        return res.redirect(`/${res.data._module}/${res.data.airfieldId}`);
    }
};