const AirfieldsSpaceModel = require('../models/AirfieldsSpaceModel');

exports.getByAirfieldId = async function(req, res){
    const {airfieldId} = req.params;
    const airfieldsSpaceModel = new AirfieldsSpaceModel();

    res.data.airfieldSpaces = await airfieldsSpaceModel.getByAirfieldId(airfieldId);

    return res.json(res.data);
};

