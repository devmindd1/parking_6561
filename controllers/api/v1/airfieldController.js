const {validationResult} = require('express-validator');
const {decimal} = require('../../../helpers/mathHelper');
const StripeService = require('../../../services/StripeService');
const AirfieldModel = require('../../../models/AirfieldModel');
const AirfieldsAmenityTypesMapModel = require('../../../models/AirfieldsAmenityTypesMapModel');
const AirfieldsRunwayTypesMapModel = require('../../../models/AirfieldsRunwayTypesMapModel');
const AirfieldsSourceModel = require('../../../models/AirfieldsSourceModel');
const OaciTypeModel = require('../../../models/OaciTypeModel');
const AirfieldsWeightTypesMapModel = require('../../../models/AirfieldsWeightTypesMapModel');
const AirfieldsSpaceModel = require('../../../models/AirfieldsSpaceModel');
const AirfieldsSpacesBookingModel = require('../../../models/AirfieldsSpacesBookingModel');
const AirfieldsSpacesBookingsInfoModel = require('../../../models/AirfieldsSpacesBookingsInfoModel');
const StripeIntentModel = require('../../../models/StripeIntentModel');
const SettingModel = require('../../../models/SettingModel');
const UserModel = require('../../../models/UserModel');

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
    const {oaciId, spaceType} = req.params;
    const airfieldModel = new AirfieldModel();

    res.data.airfield = await airfieldModel.getInfoByOaciId(oaciId);
    if(!res.data.airfield)
        return res.status(400).json(res.data);

    const airfieldsAmenityTypesMapModel = new AirfieldsAmenityTypesMapModel();
    const airfieldsRunwayTypesMapModel = new AirfieldsRunwayTypesMapModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();
    const airfieldsWeightTypesMapModel = new AirfieldsWeightTypesMapModel();
    const settingModel = new SettingModel();

    const paymentSettings = await settingModel.getPaymentSettings();
    res.data.airfield.prices = {long: '', short: ''};

    for(const priceType of AirfieldsWeightTypesMapModel._PRICE_TYPES){
        let price = await airfieldsWeightTypesMapModel.getPrice(
            req.user.id,
            AirfieldsSpaceModel._TYPES[spaceType],
            priceType,
            res.data.airfield.id
        );

        price = decimal(price + (price*paymentSettings[`pilot_${priceType}_com`]/100 + paymentSettings['custom_fee']));
        price = decimal(price + price*paymentSettings['vat_percent']/100);

        res.data.airfield.prices[priceType] = price;
    }

    res.data.airfield.images = await airfieldsSourceModel.getByAirfieldId(res.data.airfield.id);
    res.data.airfield.runways = await airfieldsRunwayTypesMapModel.getByAirfieldId(res.data.airfield.id);
    res.data.airfield.amenities = await airfieldsAmenityTypesMapModel.getByAirfieldId(res.data.airfield.id);

    return res.status(200).json(res.data);
};

exports.calcBookPrice = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    const settingModel = new SettingModel();
    const airfieldModel = new AirfieldModel();
    const airfieldsWeightTypesMapModel = new AirfieldsWeightTypesMapModel();

    const {oaciId, dateStart, dateEnd, spaceType} = req.body;
    const longTime = 3; //TODO config same var exports.book
    const airfieldId = await airfieldModel.getAirfieldIdByOaciId(oaciId);
    const paymentSettings = await settingModel.getPaymentSettings();
    const difDays = Math.abs((new Date(dateStart)).getTime() - (new Date(dateEnd)).getTime()) / 1000 / 60 / 60 / 24;
    const priceType = difDays >= longTime? AirfieldsWeightTypesMapModel._PRICE_TYPES['long']: AirfieldsWeightTypesMapModel._PRICE_TYPES['short'];
    const price = await airfieldsWeightTypesMapModel.getPrice(req.user.id, AirfieldsSpaceModel._TYPES[spaceType], priceType, airfieldId);
    const comPilotPercent = difDays >= longTime ? paymentSettings['pilot_long_com']: paymentSettings['pilot_short_com'];
    const amount = decimal(difDays * price);
    const comPilot = decimal(amount*comPilotPercent/100 + paymentSettings['custom_fee']);

    res.data.amount = amount + comPilot;
    res.data.amount = decimal(res.data.amount + res.data.amount*paymentSettings['vat_percent']/100);

    return res.status(200).json(res.data);
};

exports.book = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    //TODO calc i mej nuyn bann a grac kareli a mi tex grel mas mas anel
    //TODO kareli a dzel es
    const userModel = new UserModel();
    const stripe = new StripeService();
    const settingModel = new SettingModel();
    const airfieldModel = new AirfieldModel();
    const stripeIntentModel = new StripeIntentModel();
    const airfieldsSpacesBookingModel = new AirfieldsSpacesBookingModel();
    const airfieldsWeightTypesMapModel = new AirfieldsWeightTypesMapModel();
    const airfieldsSpacesBookingsInfoModel = new AirfieldsSpacesBookingsInfoModel();

    const {oaciId, startDate, endDate, spaceType, stripeCardId} = req.body;
    const longTime = 3; //TODO config same var exports.calcBookPrice
    const airfieldId = await airfieldModel.getAirfieldIdByOaciId(oaciId);
    const customerId = await userModel.getUserStripeCustomerId(req.user.id);
    const paymentSettings = await settingModel.getPaymentSettings();
    const difDays = Math.abs((new Date(startDate)).getTime() - (new Date(endDate)).getTime()) / 1000 / 60 / 60 / 24;
    const priceType = difDays >= longTime? AirfieldsWeightTypesMapModel._PRICE_TYPES['long']: AirfieldsWeightTypesMapModel._PRICE_TYPES['short'];

    const price = await airfieldsWeightTypesMapModel.getPrice(req.user.id, AirfieldsSpaceModel._TYPES[spaceType], priceType, airfieldId);
    const comPilotPercent = difDays >= longTime ? paymentSettings['pilot_long_com']: paymentSettings['pilot_short_com'];
    const amount = decimal(difDays * price);
    const airfieldExcludedCom = amount - (amount*paymentSettings['airfield_com']/100);
    const comPilot = decimal(amount*comPilotPercent/100 + paymentSettings['custom_fee']);

    res.data.priceWithoutFees = amount;
    res.data.amount = amount + comPilot;
    res.data.comPilot = comPilot;
    res.data.vat = decimal(res.data.amount*paymentSettings['vat_percent']/100);
    res.data.amount = decimal(res.data.amount + res.data.amount*paymentSettings['vat_percent']/100);
    res.data.airfieldVat = decimal(airfieldExcludedCom * paymentSettings['vat_percent'] / 100);
    res.data.airfieldAmount = decimal(airfieldExcludedCom);
    res.data.comAirfield = decimal(amount * paymentSettings['airfield_com'] / 100);
    res.data.comTotal = decimal(res.data.comAirfield + comPilot);

    let intent;
    try {
        await airfieldModel.startTransaction('READ COMMITTED');

        const [airfieldFreeSpace] = await airfieldModel.getFreeAirfieldsByRange({oaciId, startDate, endDate, spaceType});
        if(!airfieldFreeSpace){
            res.data.errorMessage = 'Space dont available';
            await airfieldModel.rollback();
            return res.status(400).json(res.data);
        }


        intent = await stripe._call('createIntent', [customerId, stripeCardId, res.data.amount*100]);
        if(!intent.success){
            res.data.errorMessage = intent.error.message;
            await airfieldModel.rollback();
            return res.status(400).json(res.data);
        }

        const newStripeIntentId = await stripeIntentModel.insert({
            payment_intent_id: intent.data.id,
            users_cards_id: stripeCardId,
            amount: res.data.amount,
            created_timestamp: intent.data.created
        });

        const newAirfieldSpaceBookingInfoId = await airfieldsSpacesBookingsInfoModel.insert({
            stripe_intent_id: newStripeIntentId,
            price: amount,
            com_pilot: comPilot,
            total_vat: res.data.vat,
            com_airfield: res.data.comAirfield,
            airfield_amount: res.data.airfieldAmount,
            airfield_amount_vat: res.data.airfieldVat,
            airfield_transfer: decimal(res.data.airfieldAmount + res.data.airfieldVat),
            vat_percent: decimal(paymentSettings['vat_percent'])
        });

        const created = new Date().toISOString().split('T');
        await airfieldsSpacesBookingModel.insert({
            user_id: req.user.id,
            airfields_space_id: airfieldFreeSpace.next_free_space_id,
            start_timestamp: startDate,
            end_timestamp: endDate,
            created: `${created[0]} ${created[1].split('.')[0]}`,
            airfields_spaces_bookings_info_id: newAirfieldSpaceBookingInfoId
        });

        await airfieldModel.commit();
    }catch (e) {

        console.log(e);

        await airfieldModel.rollback();
        if(intent && intent.success)
            intent = await stripe._call('cancelIntent', [intent.data.id]);

        if(!intent.success)
            // TODO LOG WRITE;

        return res.status(400).json(res.data);
    }

    return res.status(200).json(res.data);
};