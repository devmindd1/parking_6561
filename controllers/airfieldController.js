const {validationResult} = require('express-validator');
const {baseUrl, airfieldsDocumentsPath} = require('../config/defaults');
const {stripe_redirectAfterAttachBankToAirfield} = require('../config/redirectUrls');
const {upload} = require('../helpers/uploadHelper');
const AirfieldModel = require('../models/AirfieldModel');
const AirfieldsSpaceModel = require('../models/AirfieldsSpaceModel');
const AirfieldsSourceModel = require('../models/AirfieldsSourceModel');
const RunwayTypeModel = require('../models/RunwayTypeModel');
const OaciTypeModel = require('../models/OaciTypeModel');
const AmenityTypeModel = require('../models/AmenityTypeModel');
const AirfieldsRunwayTypesMapModel = require('../models/AirfieldsRunwayTypesMapModel');
const AirfieldsAmenityTypesMapModel = require('../models/AirfieldsAmenityTypesMapModel');
const AirfieldsBankModel = require('../models/AirfieldsBankModel');
const CountryModel = require('../models/CountryModel');
const StripeService = require('../services/StripeService');

exports.index = async function(req, res){
    const airfieldModel = new AirfieldModel();

    res.data.items = await airfieldModel.getByUserId(req.user.id);
    res.data.statuses = await AirfieldModel._STATUSES;

    return res.render('airfields/index', res.data);
};

// exports.bankAttached = async function(req, res){
//     const {airfieldId} = req.params;
//
//     const stripe = new StripeService();
//     const airfieldsStripeAccountModel = new AirfieldsStripeAccountModel();
//     const airfieldsStripeAccountsBankModel = new AirfieldsStripeAccountsBankModel();
//
//     const stripeAccount = await airfieldsStripeAccountModel.getAirfieldAccount(airfieldId, req.user.id);
//     if(!stripeAccount)
//         return res.redirect('/airfields');
//
//     const {data: externalAccounts} = await stripe._call('retrieveExternalAccountsByAccountId', [stripeAccount.stripe_account_id]);
//     await airfieldsStripeAccountsBankModel.deleteByAirfieldStripeAccountId(stripeAccount.id);
//
//     for(const bankAccount of externalAccounts.data)
//         await airfieldsStripeAccountsBankModel.insert({
//             airfield_stripe_account_id: stripeAccount.id,
//             bank_account_id: bankAccount.id,
//             currency_id: bankAccount.currency,
//             default_for_currency: bankAccount.default_for_currency * 1,
//             bank_name: bankAccount.bank_name
//         });
//
//     return res.redirect('/airfields');
// };

exports.create = async function(req, res){
    const runwayTypeModel = new RunwayTypeModel();
    const oaciTypeModel = new OaciTypeModel();
    const amenityTypeModel = new AmenityTypeModel();
    const countryModel = new CountryModel();

    res.data.runwayTypes = await runwayTypeModel.getAll();
    res.data.oaciTypes = await oaciTypeModel.getAllFree();


    console.log(res.data.oaciTypes);

    res.data.amenities = await amenityTypeModel.getAll();
    res.data.countries = await countryModel.getAll();

    if(req.method === 'GET') return res.render('airfields/create', res.data);


    console.log(req.body);

    const errors = validationResult(req);
    if(!errors.isEmpty()){

        console.log(errors.mapped());

        res.data.validationErrors = errors.mapped();
        return res.render('airfields/create', res.data);
    }




    const airfieldModel = new AirfieldModel();
    const airfieldsSpaceModel = new AirfieldsSpaceModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();
    const airfieldsRunwayTypesMapModel = new AirfieldsRunwayTypesMapModel();
    const airfieldsAmenityTypesMapModel = new AirfieldsAmenityTypesMapModel();
    const airfieldsBankModel = new AirfieldsBankModel();

    const newAirfieldId = await airfieldModel.insert({
        user_id: req.user.id,
        primary_email: req.body.primary_email,
        phone_number: req.body.phone_number,
        manager_name: req.body.manager_name,
        spaces_count: req.body.spaces_count,
        hangar_count: req.body.hangar_count,
        parking_count: req.body.parking_count,
        operating_license_img: await upload(req.files?.operating_license_img, airfieldsDocumentsPath),
        oaci_type_id: parseInt(req.body.oaci_type_id),
        short_hr_price_eur: parseFloat(req.body.short_hr_price_eur),
        long_day_price_eur: parseFloat(req.body.long_day_price_eur),
    });

    const saveAirfieldImagesIds = req.body.save_airfield_photo_ids.split(',');
    if(req.files && req.files['airfield_images'])
        for(let i = 0; i < req.files['airfield_images'].length; i++)
            if(saveAirfieldImagesIds.includes(i.toString()))
                await airfieldsSourceModel.insert({
                    airfield_id: newAirfieldId,
                    file_path: await upload(req.files['airfield_images'][i], airfieldsDocumentsPath)
                });

    for(let i = 1; i <= parseInt(req.body.hangar_count); i++)
        await airfieldsSpaceModel.insert({
            title: String(i),
            airfield_id: newAirfieldId,
            type: AirfieldsSpaceModel._TYPES['hangar']
        });

    for(let i = 1; i <= parseInt(req.body.parking_count); i++)
        await airfieldsSpaceModel.insert({
            title: String(i),
            airfield_id: newAirfieldId,
            type: AirfieldsSpaceModel._TYPES['parking']
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

    await airfieldsBankModel.insert({
        airfield_id: newAirfieldId,
        first_name: req.body.bank_first_name,
        last_name: req.body.bank_last_name,
        account_name: req.body.bank_account_name,
        name: req.body.bank_name,
        bic: req.body.bank_bic,
        iban_number: req.body.bank_iban_number,
        email: req.body.bank_email,
        phone: req.body.bank_phone,
        country_code: req.body.bank_country_code,
    });

    return res.redirect('/airfields');
};

exports.createStripeAccount = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.mapped();
        return res.status(400).json(res.data);
    }

    const stripe = new StripeService();
    const airfieldsBankModel = new AirfieldsBankModel();

    const token = await stripe._call('createAccountToken', [req.body['stripe']]);
    if(!token.success){
        res.data.errorMessage = token.error.message;
        return res.status(400).json(res.data);
    }

    const account = await stripe._call('createAccountByAccountToken', [token.data.id, req.body['stripe']]);
    if(!account.success){
        res.data.errorMessage = account.error.message;
        return res.status(400).json(res.data);
    }

    res.data.airfieldStripeAccountId = await airfieldsBankModel.insert({
        first_name: req.body['bank']['first_name'],
        last_name: req.body['bank']['last_name'],
        account_name: req.body['bank']['account_name'],
        bank_name: req.body['bank']['bank_name'],
        bic: req.body['bank']['bic'],
        iban_number: req.body['bank']['iban_number'],
        email: req.body['bank']['email'],
        phone: req.body['bank']['phone'],
        country_code: req.body['bank']['country_code'],
    });

    return res.status(200).json(res.data);
};

exports.checkEmails = async function(req, res){
    const {primaryEmail, bankEmail} = req.body;
    const airfieldModel = new AirfieldModel();
    const airfieldsBankModel = new AirfieldsBankModel();

    res.data.primaryEmailExists = await airfieldModel.checkPrimaryEmailExists(req.user.id, primaryEmail);
    res.data.stripeEmailExists = await airfieldsBankModel.checkEmailExists(bankEmail);

    return res.status(200).json(res.data);
};

exports.createLinkForAttachBankToAirfieldAccount = async function(req, res){
    const {airfieldId} = req.body;
    const stripe = new StripeService();
    const airfieldsBankModel = new AirfieldsBankModel();

    const stripeAccount = await airfieldsBankModel.getAirfieldBank(airfieldId, req.user.id);
    if(!stripeAccount)
        return res.status(400).json(res.data);

    const attachBankLink = await stripe._call('createAttachBankToAccountLink', [
        stripeAccount.stripe_account_id,
        baseUrl + stripe_redirectAfterAttachBankToAirfield.replace('{{AIRFIELD_ID}}', airfieldId)
    ]);
    if(!attachBankLink.success || !attachBankLink.data.url)
        return res.status(400).json(res.data);

    res.data.url = attachBankLink.data.url;

    return res.status(200).json(res.data);
};