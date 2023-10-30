const {validationResult} = require('express-validator');
const StripeService = require('../../../services/StripeService');
const AirfieldModel = require('../../../models/AirfieldModel');
const AirfieldsAmenityTypesMapModel = require('../../../models/AirfieldsAmenityTypesMapModel');
const AirfieldsRunwayTypesMapModel = require('../../../models/AirfieldsRunwayTypesMapModel');
const AirfieldsSourceModel = require('../../../models/AirfieldsSourceModel');
const OaciTypeModel = require('../../../models/OaciTypeModel');

exports.freeAirfieldsByRange = async function(req, res){
    const airfieldModel = new AirfieldModel();
    const oaciTypeModel = new OaciTypeModel();

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    res.data.airfields = await airfieldModel.getFreeAirfieldsByRange(req.query);

    res.data.oacies = await oaciTypeModel.getAllNotConnected();

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

exports.getByOaciId = async function(req, res){
    const {oaciId} = req.params;

    const airfieldModel = new AirfieldModel();
    const airfieldsAmenityTypesMapModel = new AirfieldsAmenityTypesMapModel();
    const airfieldsRunwayTypesMapModel = new AirfieldsRunwayTypesMapModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();

    res.data.airfield = await airfieldModel.getInfoByOaciId(oaciId);
    if(!res.data.airfield)
        return res.status(400).json(res.data);

    res.data.airfield.images = await airfieldsSourceModel.getByAirfieldId(res.data.airfield.id);
    res.data.airfield.runways = await airfieldsRunwayTypesMapModel.getByAirfieldId(res.data.airfield.id);
    res.data.airfield.amenities = await airfieldsAmenityTypesMapModel.getByAirfieldId(res.data.airfield.id);

    return res.status(200).json(res.data);
};

exports.book = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    const stripe = new StripeService();
    const airfieldModel = new AirfieldModel();

    const airfield = await airfieldModel.getByOaciId(req.body.oaciId);
    if(!airfield)
        return res.status(400).json(res.data);


    const t1 = new Date(req.body.dateStart);
    const t2 = new Date(req.body.dateEnd);
    const difHours = Math.abs(t1.getTime() - t2.getTime()) / 1000 / 60 / 60;

    const price = req.body.paymentMethod === '1' ? airfield.long_day_price_eur :airfield.short_hr_price_eur;

    res.data.amount = difHours * price;
    res.data.amount += res.data.amount*5/100;
    res.data.amount += res.data.amount*20/100;


    // const a = await stripe._call('createIntent', ['cus_OgXI9nshn8gaK7', difHours * airfield.short_hr_price_eur]);
    // const b = await stripe._call('orderIntent', ['acct_1NxmFZQXht3fFlAO', 1000]);


    // short_hr_price_eur: '10.00',
    //     long_day_price_eur: '0.1




    // console.log(a);
    // console.log(b);


    return res.status(200).json(res.data);
};