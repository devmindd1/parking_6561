const {validationResult} = require('express-validator');
const {ownerDocumentsPath} = require('../config/defaults');
const {upload} = require('../helpers/uploadHelper');
const AirfieldModel = require('../models/AirfieldModel');
const AirfieldsSpaceModel = require('../models/AirfieldsSpaceModel');
const AirfieldsSourceModel = require('../models/AirfieldsSourceModel');

exports.index = async function(req, res){
    console.log(req.user.id);
    const airfieldModel = new AirfieldModel();

    res.data.items = await airfieldModel.getByUserId(req.user.id);
    res.data.statuses = await AirfieldModel._STATUSES;

    return res.render('airfields/index', res.data);
};

exports.createNew = function(req, res){
    return res.render('airfields/create');
};


exports.insert = async function(req, res){
    let operating_license_img = '';

    const airfieldModel = new AirfieldModel();
    const airfieldsSpaceModel = new AirfieldsSpaceModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    if(req.files && req.files['operating_license_img'])
        operating_license_img = await upload(req.files['operating_license_img'], ownerDocumentsPath);

    const newAirfieldId = await airfieldModel.insert({
        user_id: req.user.id,
        address: req.body.address,
        primary_email: req.body.primary_email,
        phone_number: req.body.phone_number,
        manager_name: req.body.manager_name,
        spaces_count: req.body.spaces_count,
        operating_license_img: operating_license_img
    });

    if(req.files && req.files['airfield_images'])
        for(const file of req.files['airfield_images'])
            await airfieldsSourceModel.insert({
                airfield_id: newAirfieldId,
                file_path: await upload(file, ownerDocumentsPath)
            });

    for(let i = 0; i < parseInt(req.body.spaces_count); i++)
        await airfieldsSpaceModel.insert({
            airfield_id: newAirfieldId,
            title: String(i)
        });

    return res.status(200).json(res.data);
};