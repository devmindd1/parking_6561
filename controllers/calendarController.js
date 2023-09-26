const AirfieldModel = require('../models/AirfieldModel');
const AirfieldsSpacesBookingModel = require('../models/AirfieldsSpacesBookingModel');

exports.index = async function(req, res){
    const airfieldModel = new AirfieldModel();

    res.data.airfields =  await airfieldModel.getByUserId(req.user.id, true);

    return res.render('calendar/index', res.data);
};


exports.get = async function(req, res){
    const {startDate, endDate, airfieldId, airfieldSpaceId} = req.body;
    const airfieldsSpacesBookingModel = new AirfieldsSpacesBookingModel();

    res.data.bookings = await airfieldsSpacesBookingModel.getByRange(startDate, endDate, {
        airfieldId: airfieldId,
        airfieldSpaceId: airfieldSpaceId
    });

    return res.status(200).json(res.data);
};