const {validationResult} = require('express-validator');
const {airfieldsDocumentsPath} = require('../config/defaults');
const {upload} = require('../helpers/uploadHelper');
const AirfieldModel = require('../models/AirfieldModel');
const AirfieldsSpaceModel = require('../models/AirfieldsSpaceModel');
const AirfieldsSourceModel = require('../models/AirfieldsSourceModel');
const RunwayTypeModel = require('../models/RunwayTypeModel');
const OaciTypeModel = require('../models/OaciTypeModel');

exports.index = async function(req, res){
    const airfieldModel = new AirfieldModel();

    res.data.items = await airfieldModel.getByUserId(req.user.id);
    res.data.statuses = await AirfieldModel._STATUSES;

    return res.render('airfields/index', res.data);
};

exports.create = async function(req, res){
    const runwayTypeModel = new RunwayTypeModel();
    const oaciTypeModel = new OaciTypeModel();

    res.data.runwayTypes = await runwayTypeModel.getAll();
    res.data.oaciTypes = await oaciTypeModel.getAll();

    return res.render('airfields/create', res.data);
};

exports.checkPrimaryEmail = async function(req, res){
    const {primaryEmail} = req.body;
    const airfieldModel = new AirfieldModel();

    res.data.primaryEmailExists = await airfieldModel.checkPrimaryEmailExists(req.user.id, primaryEmail);

    return res.status(200).json(res.data);
};

exports.insert = async function(req, res){
    let operating_license_img = '';

    const airfieldModel = new AirfieldModel();
    const airfieldsSpaceModel = new AirfieldsSpaceModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.mapped();
        return res.render('airfields/create', res.data);
    }

    if(req.files && req.files['operating_license_img'])
        operating_license_img = await upload(req.files['operating_license_img'], airfieldsDocumentsPath);

    const newAirfieldId = await airfieldModel.insert({
        user_id: req.user.id,
        address: req.body.address,
        primary_email: req.body.primary_email,
        phone_number: req.body.phone_number,
        manager_name: req.body.manager_name,
        spaces_count: req.body.spaces_count,
        operating_license_img: operating_license_img,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    if(req.files && req.files['airfield_images'])
        for(const file of req.files['airfield_images'])
            await airfieldsSourceModel.insert({
                airfield_id: newAirfieldId,
                file_path: await upload(file, airfieldsDocumentsPath)
            });

    for(let i = 0; i < parseInt(req.body.spaces_count); i++)
        await airfieldsSpaceModel.insert({
            airfield_id: newAirfieldId,
            title: String(i)
        });

    return res.redirect('/airfields');
};