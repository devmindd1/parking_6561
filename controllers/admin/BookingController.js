const {validate} = require('../../core/validator');
const Model = require('../../models/AirfieldsSpacesBookingModel.js');

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
        res.data.bookingSpaceId = req.params.bookingSpaceId;
        res.data.airfieldId = req.params.airfieldId;
        res.data.item = await this.model.getById(res.data.bookingSpaceId);

        return res.render(`admin/${res.data._module}/view`, res.data);
    }

    async submit(req, res){
        const {submit} = req.body;
        res.data.bookingSpaceId = req.params.bookingSpaceId;
        res.data.airfieldId = req.params.airfieldId;

        res.data.item = await this.model.getByAirfieldId(res.data.bookingSpaceId, res.data.airfieldId);
        if(!res.data.item)
            return res.redirect(`/admin/${res.data._module}/${res.data.airfieldId}`);

        const status = AirfieldsSpacesBookingModel._STATUSES[submit];
        if(!status)
            return res.redirect(`/admin/${res.data._module}/${res.data.airfieldId}`);

        let intent;
        try {
            await this.model.startTransaction('READ COMMITTED');

            intent = await stripe._call('createIntent', [customerId, stripeCardId, res.data.amount*100]);
            if(!intent.success){
                res.data.errorMessage = intent.error.message;
                await airfieldModel.rollback();
                return res.status(400).json(res.data);
            }

            await airfieldModel.commit();
        }catch (e) {

            console.log(e);

            await airfieldModel.rollback();
            if(intent && intent.success)
                intent = await stripe._call('cancelIntent', [intent.data.id]);

            if(!intent.success)
            // TODO LOG WRITE;

                return res.status(400).json(res.data);
        }

        //

        return res.render(`admin/${res.data._module}/view`, res.data);
    }
};