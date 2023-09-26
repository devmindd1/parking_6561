const AirfieldModel = require('../../models/AirfieldModel.js');
const AirfieldsSourceModel = require('../../models/AirfieldsSourceModel.js');
const RunwayTypeModel = require('../../models/RunwayTypeModel.js');

exports.index = async function(req, res){
    const airfieldModel = new AirfieldModel();

    res.data.items = await airfieldModel.getAllOwnersAirfields();
    res.data.statuses = AirfieldModel._STATUSES;

    return res.render('admin/airfields/index', res.data);
};

exports.edit = async function(req, res){
    const {id} = req.params;
    const airfieldModel = new AirfieldModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();
    const runwayTypeModel = new RunwayTypeModel();

    res.data.airfield =  await airfieldModel.getById(id);
    res.data.airfieldPhotos =  await airfieldsSourceModel.getByAirfieldId(id);
    res.data.runwayTypes =  await runwayTypeModel.getAllIndexedById();
    res.data.statuses =  AirfieldModel._STATUSES;

    return res.render("admin/airfields/edit", res.data);
};

exports.update = async function(req, res){
    const {id} = req.params;
    const {airfield_status} = req.body;

    const airfieldModel = new AirfieldModel();

    res.data.status = airfield_status;

    await airfieldModel.update(id, res.data);

    return res.redirect("/admin/airfields");
};