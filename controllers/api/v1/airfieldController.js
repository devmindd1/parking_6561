const AirfieldModel = require('../../../models/AirfieldModel');
const AirfieldsAmenityTypesMapModel = require('../../../models/AirfieldsAmenityTypesMapModel');
const AirfieldsRunwayTypesMapModel = require('../../../models/AirfieldsRunwayTypesMapModel');
const AirfieldsSourceModel = require('../../../models/AirfieldsSourceModel');

exports.freeAirfieldsByRange = async function(req, res){
    const {startDate, endDate} = req.query;
    const airfieldModel = new AirfieldModel();

    if(!startDate || !endDate)
        res.data.airfields = await airfieldModel.getAllApproved();
    else
        res.data.airfields = await airfieldModel.getFreeAirfieldsByRange(startDate, endDate);

    return res.status(200).json(res.data);
};

exports.getById = async function(req, res){
    const {airfieldId} = req.params;
    const airfieldModel = new AirfieldModel();
    const airfieldsAmenityTypesMapModel = new AirfieldsAmenityTypesMapModel();
    const airfieldsRunwayTypesMapModel = new AirfieldsRunwayTypesMapModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();

    res.data.airfield = await airfieldModel.getInfo(airfieldId);
    if(!res.data.airfield)
        return res.status(400).json(res.data);

    res.data.airfield.images = await airfieldsSourceModel.getByAirfieldId(airfieldId);
    res.data.airfield.runways = await airfieldsRunwayTypesMapModel.getByAirfieldId(airfieldId);
    res.data.airfield.amenities = await airfieldsAmenityTypesMapModel.getByAirfieldId(airfieldId);

    return res.status(200).json(res.data);
};