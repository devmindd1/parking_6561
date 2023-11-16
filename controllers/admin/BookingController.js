const {validate} = require('../../core/validator');
const Model = require('../../models/AirfieldsSpacesBookingModel.js');
const StripeIntentModel = require('../../models/StripeIntentModel.js');
const StripeService = require('../../services/StripeService.js');

module.exports = class EquipmentTypeController{
    constructor(req, res, next, action){
        this.model = new Model();
        res.data._module = 'bookings';
        res.data._name = 'Bookings';

        this[action](req, res, next);
    }

    async index(req, res){
        const {airfieldId} = req.params;
        res.data.items = await this.model.getAllByAirfieldId(airfieldId);

        return res.render(`admin/${res.data._module}/index`, res.data);
    }

    async view(req, res){
        res.data.airfieldsSpacesBookingId = req.params.airfieldsSpacesBookingId;
        res.data.airfieldId = req.params.airfieldId;
        res.data.item = await this.model.getById(res.data.airfieldsSpacesBookingId);

        return res.render(`admin/${res.data._module}/view`, res.data);
    }

    async submit(req, res){
        const {submit} = req.body;
        res.data.airfieldsSpacesBookingId = req.params.airfieldsSpacesBookingId;
        res.data.airfieldId = req.params.airfieldId;

        res.data.item = await this.model.getByAirfieldId(res.data.airfieldsSpacesBookingId, res.data.airfieldId);
        if(!res.data.item)
            return res.redirect(`/admin/${res.data._module}/${res.data.airfieldId}`);

        const status = AirfieldsSpacesBookingModel._STATUSES[submit];
        if(!status)
            return res.redirect(`/admin/${res.data._module}/${res.data.airfieldId}`);

        const stripeIntentModel = new StripeIntentModel();
        const stripe = new StripeService();

        const stripePaymentIntent = await stripeIntentModel.getByAirfieldsSpacesBookingId(res.data.airfieldsSpacesBookingId);

        let intent;
        try {
            await this.model.startTransaction('READ COMMITTED');

            // await stripeIntentModel.




            intent = await stripe._call(`${submit}Intent`, [stripePaymentIntent['payment_intent_id']]);
            if(!intent.success){
                res.data.errorMessage = intent.error.message;
                await this.model.rollback();
                return res.redirect(`/admin/${res.data._module}/${res.data.airfieldId}`);
            }



            await this.model.commit();
        }catch (e) {
            console.log(e);

            await this.model.rollback();
        }

        return res.redirect(`/admin/${res.data._module}/${res.data.airfieldId}`);
    }
};