const {validationResult} = require('express-validator');
const {decimal} = require('../../../helpers/mathHelper');
const StripeService = require('../../../services/StripeService');
const AirfieldModel = require('../../../models/AirfieldModel');
const AirfieldsAmenityTypesMapModel = require('../../../models/AirfieldsAmenityTypesMapModel');
const AirfieldsRunwayTypesMapModel = require('../../../models/AirfieldsRunwayTypesMapModel');
const AirfieldsSourceModel = require('../../../models/AirfieldsSourceModel');
const OaciTypeModel = require('../../../models/OaciTypeModel');
const UsersCardsModel = require('../../../models/UsersCardsModel');
const AirfieldsWeightTypesMapModel = require('../../../models/AirfieldsWeightTypesMapModel');
const AirfieldsSpaceModel = require('../../../models/AirfieldsSpaceModel');
const AirfieldsSpacesBookingModel = require('../../../models/AirfieldsSpacesBookingModel');
const AirfieldsSpacesBookingsInfoModel = require('../../../models/AirfieldsSpacesBookingsInfoModel');
const StripeIntentModel = require('../../../models/StripeIntentModel');
const SettingModel = require('../../../models/SettingModel');

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
    const airfieldsAmenityTypesMapModel = new AirfieldsAmenityTypesMapModel();
    const airfieldsRunwayTypesMapModel = new AirfieldsRunwayTypesMapModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();

    res.data.airfield = await airfieldModel.getInfoByOaciId(oaciId);
    if(!res.data.airfield)
        return res.status(400).json(res.data);

    const airfieldsWeightTypesMapModel = new AirfieldsWeightTypesMapModel();

    const chgitemInchTokos = 0.25;
    const vat_percent = 20;
    const setting_pilot_short_com = 5;
    const setting_pilot_long_com = 3;

    res.data.airfield.prices = {
        long: '',
        short: ''
    };

    for(const priceType of ['long', 'short']){
        let price = await airfieldsWeightTypesMapModel.getPrice(
            req.user.id,
            AirfieldsSpaceModel._TYPES[spaceType],
            priceType,
            res.data.airfield.id
        );

        const comPilotPercent = priceType === 'long' ? setting_pilot_long_com: setting_pilot_short_com;

        price = decimal(price + (price*comPilotPercent/100 + chgitemInchTokos));
        price = decimal(price + price*vat_percent/100);

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

    const stripe = new StripeService();
    const airfieldModel = new AirfieldModel();

    const airfield = await airfieldModel.getByOaciId(req.body.oaciId);
    if(!airfield)
        return res.status(400).json(res.data);


    const t1 = new Date(req.body.dateStart);
    const t2 = new Date(req.body.dateEnd);
    const difDays = Math.abs(t1.getTime() - t2.getTime()) / 1000 / 60 / 60 / 24;

    const price = difDays >= 3 ? airfield.long_day_price_eur: airfield.short_hr_price_eur;
    const avionestComPercent = difDays >= 3 ? 5: 5;


    const amount = parseFloat((difDays * price).toFixed(2));
    res.data.priceForDay = price;


    res.data.amount = amount;


    const avionestChargeCom = parseFloat((res.data.amount*avionestComPercent/100 + 0.25).toFixed(2));


    console.log(avionestChargeCom);

    res.data.avionestChargeCom = avionestChargeCom;
    res.data.amount += avionestChargeCom;
    res.data.amount = parseFloat(res.data.amount.toFixed(2));

    res.data.chargeWithAvionestCom = res.data.amount;



    console.log(res.data.chargeWithAvionestCom);


    // console.log(res.data);

    res.data.amount += res.data.amount*20/100;


    res.data.amount = parseFloat(res.data.amount.toFixed(2));


    // res.data.fifePercentOfAmount += res.data.amount*20/100;



    const t = amount - (amount*10/100);



    res.data.airfield = parseFloat((t + (t * 20 / 100)).toFixed(2));
    res.data.comAirfield = parseFloat((amount * 10 / 100).toFixed(2));




    // const a = await stripe._call('createIntent', ['cus_OgXI9nshn8gaK7', difHours * airfield.short_hr_price_eur]);
    // const b = await stripe._call('orderIntent', ['acct_1NxmFZQXht3fFlAO', 1000]);


    return res.status(200).json(res.data);
};

exports.book = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    const stripe = new StripeService();
    const settingModel = new SettingModel();
    const airfieldModel = new AirfieldModel();
    const usersCardsModel = new UsersCardsModel();
    const stripeIntentModel = new StripeIntentModel();
    const airfieldsSpaceModel = new AirfieldsSpaceModel();
    const airfieldsSpacesBookingModel = new AirfieldsSpacesBookingModel();
    const airfieldsSpacesBookingsInfoModel = new AirfieldsSpacesBookingsInfoModel();


    const paymentSettings = await settingModel.getPaymentSettings();


    //todo startDate endDate required

    const stripeCardId = 'card_1O2r3EHsAwmdsPL7oCWw11Ca';
    const customerId = 'cus_OqEHlBVUW9y21x';

    const airfieldId = 92;
    const oaciId = 5;
    const spaceType = 'parking';
    const startDate = '2023-12-28';
    const endDate = '2023-12-29';

    const difDays = Math.abs((new Date(startDate)).getTime() - (new Date(endDate)).getTime()) / 1000 / 60 / 60 / 24;
    const priceType = difDays >= 3? 'long': 'short';

    const chgitemInchTokos = 0.25;
    const setting_pilot_short_com = 5;
    const setting_pilot_long_com = 3;
    const comAirfieldPercent = 10;
    const vat_percent = 20;

    const card = await usersCardsModel.getCardByUserId(req.user.id, stripeCardId);
    if(!card){
        res.data.errorMessage = 'card is not defined';
        return res.status(400).json(res.data);
    }

    const [airfieldFreeSpace] = await airfieldModel.getFreeAirfieldsByRange({
        startDate,
        endDate,
        oaciId,
        spaceType
    });

    const airfieldFreeSpaceId = await airfieldsSpaceModel.getRandomFreeAirfieldSpaceId(airfieldId, startDate, endDate, spaceType);
    if(!airfieldFreeSpace || !airfieldFreeSpaceId){
        res.data.errorMessage = 'parking i space arden hasaneli chi krkin porceq';
        return res.status(400).json(res.data);
    }

    const airfieldsWeightTypesMapModel = new AirfieldsWeightTypesMapModel();
    const price = await airfieldsWeightTypesMapModel.getPrice(
        req.user.id,
        AirfieldsSpaceModel._TYPES[spaceType],
        priceType,
        airfieldId
    );

    const comPilotPercent = difDays >= 3 ? setting_pilot_long_com: setting_pilot_short_com;
    const amount = decimal(difDays * price);
    const airfieldExcludedCom = amount - (amount*comAirfieldPercent/100);
    const comPilot = decimal(amount*comPilotPercent/100 + chgitemInchTokos);

    res.data.priceWithoutFees = amount;
    res.data.amount = amount + comPilot;
    res.data.comPilot = comPilot;
    res.data.vat = decimal(comPilot + res.data.amount*vat_percent/100);
    res.data.amount = decimal(res.data.amount + res.data.amount*vat_percent/100);
    res.data.airfieldVat = decimal(airfieldExcludedCom * vat_percent / 100);
    res.data.airfieldAmount = decimal(airfieldExcludedCom);
    res.data.comAirfield = decimal(amount * comAirfieldPercent / 100);
    res.data.comTotal = decimal(res.data.comAirfield + comPilot);

    const intent = await stripe._call('createIntent', [customerId, stripeCardId, res.data.amount*100]);
    if(!intent.success){
        res.data.errorMessage = intent.error.message;
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
        airfield_transfer: decimal(res.data.airfieldAmount + res.data.airfieldVat)
    });

    await airfieldsSpacesBookingModel.insert({
        user_id: req.user.id,
        airfields_space_id: airfieldFreeSpaceId,
        start_timestamp: startDate,
        end_timestamp: endDate,
        created: new Date().toISOString().split('T')[0],
        airfields_spaces_bookings_info_id: newAirfieldSpaceBookingInfoId
    });

    return res.status(200).json(res.data);
};