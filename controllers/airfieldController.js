const {validationResult} = require('express-validator');
const {airfieldsDocumentsPath} = require('../config/defaults');
const {upload} = require('../helpers/uploadHelper');
const AirfieldModel = require('../models/AirfieldModel');
const AirfieldsSpaceModel = require('../models/AirfieldsSpaceModel');
const AirfieldsSourceModel = require('../models/AirfieldsSourceModel');
const RunwayTypeModel = require('../models/RunwayTypeModel');
const OaciTypeModel = require('../models/OaciTypeModel');
const AmenityTypeModel = require('../models/AmenityTypeModel');
const AirfieldsRunwayTypesMapModel = require('../models/AirfieldsRunwayTypesMapModel');
const AirfieldsAmenityTypesMapModel = require('../models/AirfieldsAmenityTypesMapModel');
const http = require('http');

exports.index = async function(req, res){
    const airfieldModel = new AirfieldModel();

    res.data.items = await airfieldModel.getByUserId(req.user.id);
    res.data.statuses = await AirfieldModel._STATUSES;

    return res.render('airfields/index', res.data);
};

exports.create = async function(req, res){
    let operating_license_img = '';
    const runwayTypeModel = new RunwayTypeModel();
    const oaciTypeModel = new OaciTypeModel();
    const amenityTypeModel = new AmenityTypeModel();

    res.data.runwayTypes = await runwayTypeModel.getAll();
    res.data.oaciTypes = await oaciTypeModel.getAll();
    res.data.amenities = await amenityTypeModel.getAll();

    if(req.method === 'GET')
        return res.render('airfields/create', res.data);

    const airfieldModel = new AirfieldModel();
    const airfieldsSpaceModel = new AirfieldsSpaceModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();
    const airfieldsRunwayTypesMapModel = new AirfieldsRunwayTypesMapModel();
    const airfieldsAmenityTypesMapModel = new AirfieldsAmenityTypesMapModel();

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.mapped();
        return res.render('airfields/create', res.data);
    }

    if(req.files && req.files['operating_license_img'])
        operating_license_img = await upload(req.files['operating_license_img'], airfieldsDocumentsPath);


    console.log(req.body);

    const newAirfieldId = await airfieldModel.insert({
        user_id: req.user.id,
        address: req.body.address,
        primary_email: req.body.primary_email,
        phone_number: req.body.phone_number,
        manager_name: req.body.manager_name,
        spaces_count: req.body.spaces_count,
        operating_license_img: operating_license_img,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        short_hr_price_eur: parseFloat(req.body.short_hr_price_eur),
        long_hr_price_eur: parseFloat(req.body.long_hr_price_eur),
    });

    const saveAirfieldImagesIds = req.body.save_airfield_photo_ids.split(',');
    if(req.files && req.files['airfield_images'])
        for(let i = 0; i < req.files['airfield_images'].length; i++)
            if(saveAirfieldImagesIds.includes(i.toString()))
                await airfieldsSourceModel.insert({
                    airfield_id: newAirfieldId,
                    file_path: await upload(req.files['airfield_images'][i], airfieldsDocumentsPath)
                });

    for(let i = 0; i < parseInt(req.body.spaces_count); i++)
        await airfieldsSpaceModel.insert({
            airfield_id: newAirfieldId,
            title: String(i)
        });

    for(let i = 0; i < req.body.runway_type_ids.length; i++)
        await airfieldsRunwayTypesMapModel.insert({
            airfield_id: newAirfieldId,
            runway_type_id: req.body.runway_type_ids[i]
        });

    if(req.body.amenity_type_ids)
        for(let i = 0; i < req.body.amenity_type_ids.length; i++)
            await airfieldsAmenityTypesMapModel.insert({
                airfield_id: newAirfieldId,
                amenity_type_id: req.body.amenity_type_ids[i]
            });

    return res.redirect('/airfields');
};

exports.checkPrimaryEmail = async function(req, res){
    const {primaryEmail} = req.body;
    const airfieldModel = new AirfieldModel();

    res.data.primaryEmailExists = await airfieldModel.checkPrimaryEmailExists(req.user.id, primaryEmail);

    return res.status(200).json(res.data);
};