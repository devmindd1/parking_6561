const AirfieldModel = require('../../../models/AirfieldModel');

exports.freeAirfieldsByRange = async function(req, res){
    const {startDate, endDate} = req.query;
    const airfieldModel = new AirfieldModel();

    if(!startDate || !endDate)
        res.data.airfields = await airfieldModel.getAllApproved();
    else
        res.data.airfields = await airfieldModel.getFreeAirfieldsByRange(startDate, endDate);

    return res.status(200).json(res.data);
};