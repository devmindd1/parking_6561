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

};