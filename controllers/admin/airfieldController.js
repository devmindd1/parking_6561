const {validationResult} = require('express-validator');
const {string2sha1} = require('../../helpers/stringHelper.js');
const AirfieldModel = require('../../models/AirfieldModel.js');

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

    return res.render("admin/airfields/edit",  {
        airfield: await airfieldModel.getById(id),
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