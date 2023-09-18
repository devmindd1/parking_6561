const AirfieldModel = require('../../models/AirfieldModel.js');
const AirfieldsSourceModel = require('../../models/AirfieldsSourceModel.js');
const RunwayTypeModel = require('../../models/RunwayTypeModel.js');

exports.index = async function(req, res){
    const airfieldModel = new AirfieldModel();

    const airfields = await airfieldModel.getAllOwnersAirfields();

    return res.render('admin/airfields/index', {
        items: airfields,
        statuses: AirfieldModel._STATUSES
    });
};

exports.edit = async function(req, res){
    const {id} = req.params;
    const airfieldModel = new AirfieldModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();
    const runwayTypeModel = new RunwayTypeModel();

    return res.render("admin/airfields/edit",  {
        airfield: await airfieldModel.getById(id),
        airfieldPhotos: await airfieldsSourceModel.getByAirfieldId(id),
        runwayTypes: await await runwayTypeModel.getAllIndexedById(),
        statuses: AirfieldModel._STATUSES
    });
};

exports.update = async function(req, res){
    const {id} = req.params;
    const {airfield_status} = req.body;

    const airfieldModel = new AirfieldModel();

    await airfieldModel.update(id, {
        status: airfield_status
    });

    return res.redirect("/admin/airfields");
};