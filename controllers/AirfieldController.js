const {validate} = require('../core/validator');
const Model = require('../models/AirfieldModel.js');

const {baseUrl, airfieldsDocumentsPath} = require('../config/defaults');
const {upload} = require('../helpers/uploadHelper');
const AirfieldsSpaceModel = require('../models/AirfieldsSpaceModel');
const AirfieldsSourceModel = require('../models/AirfieldsSourceModel');
const RunwayTypeModel = require('../models/RunwayTypeModel');
const OaciTypeModel = require('../models/OaciTypeModel');
const AmenityTypeModel = require('../models/AmenityTypeModel');
const AirfieldsRunwayTypesMapModel = require('../models/AirfieldsRunwayTypesMapModel');
const AirfieldsAmenityTypesMapModel = require('../models/AirfieldsAmenityTypesMapModel');
const AirfieldsWeightTypesMapModel = require('../models/AirfieldsWeightTypesMapModel');
const AirfieldsBankModel = require('../models/AirfieldsBankModel');
const CountryModel = require('../models/CountryModel');
const WeightTypeModel = require('../models/WeightTypeModel');

module.exports = class AirfieldController{
    constructor(req, res, next, action){
        this.model = new Model();
        res.data._module = 'airfields';
        res.data._name = 'Airfields';

        this[action](req, res, next);
    }

    async index(req, res){
        res.data.items = await this.model.getByUserId(req.user.id);
        res.data.statuses = await Model._STATUSES;

        return res.render(`${res.data._module}/index`, res.data);
    }

    async checkEmails(req, res){
        const {primaryEmail, bankEmail} = req.body;
        const airfieldsBankModel = new AirfieldsBankModel();

        res.data.primaryEmailExists = await this.model.checkPrimaryEmailExists(req.user.id, primaryEmail);
        res.data.stripeEmailExists = await airfieldsBankModel.checkEmailExists(bankEmail);

        return res.status(200).json(res.data);
    };

    async edit(req, res){
        const runwayTypeModel = new RunwayTypeModel();
        const oaciTypeModel = new OaciTypeModel();
        const amenityTypeModel = new AmenityTypeModel();
        const countryModel = new CountryModel();
        const weightTypeModel = new WeightTypeModel();
        const airfieldsWeightTypesMapModel = new AirfieldsWeightTypesMapModel();

        res.data.id = req.params.id;
        res.data.model = await this.model.getById(res.data.id);
        res.data.weightTypes = await weightTypeModel.getAll();
        res.data.runwayTypes = await runwayTypeModel.getAll();
        res.data.oaciTypes = await oaciTypeModel.getAllFree();
        res.data.amenities = await amenityTypeModel.getAll();
        res.data.countries = await countryModel.getAll();



        res.data.model.weightTypes = await airfieldsWeightTypesMapModel.getAirfieldWeights(res.data.id);

        console.log(res.data.model.weightTypes);


        if(req.method === 'GET' || !validate(req, res))
            return res.render(`${res.data._module}/edit`, res.data);



        return res.redirect(`/${res.data._module}`);
    }

    async create(req, res){
        const runwayTypeModel = new RunwayTypeModel();
        const oaciTypeModel = new OaciTypeModel();
        const amenityTypeModel = new AmenityTypeModel();
        const countryModel = new CountryModel();
        const weightTypeModel = new WeightTypeModel();

        res.data.weightTypes = await weightTypeModel.getAll();
        res.data.runwayTypes = await runwayTypeModel.getAll();
        res.data.oaciTypes = await oaciTypeModel.getAllFree();
        res.data.amenities = await amenityTypeModel.getAll();
        res.data.countries = await countryModel.getAll();

        if(req.method === 'GET' || !validate(req, res))
            return res.render(`${res.data._module}/create`, res.data);

        const airfieldsSpaceModel = new AirfieldsSpaceModel();
        const airfieldsSourceModel = new AirfieldsSourceModel();
        const airfieldsRunwayTypesMapModel = new AirfieldsRunwayTypesMapModel();
        const airfieldsAmenityTypesMapModel = new AirfieldsAmenityTypesMapModel();
        const airfieldsBankModel = new AirfieldsBankModel();
        const airfieldsWeightTypesMapModel = new AirfieldsWeightTypesMapModel();

        const newAirfieldId = await this.model.insert({
            user_id: req.user.id,
            primary_email: req.body.primary_email,
            phone_number: req.body.phone_number,
            manager_name: req.body.manager_name,
            spaces_count: req.body.spaces_count,
            hangar_count: req.body.hangar_count,
            parking_count: req.body.parking_count,
            operating_license_img: await upload(req.files?.operating_license_img, airfieldsDocumentsPath),
            oaci_type_id: parseInt(req.body.oaci_type_id)
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

        for(const weightType of res.data.weightTypes)
            for(const [, spaceType] of Object.entries(AirfieldsSpaceModel._TYPES))
                for(const [, priceType] of Object.entries(AirfieldsWeightTypesMapModel._PRICE_TYPES))
                    if(req.body[`weight_type[${spaceType}][${weightType.id}][${priceType}]`])
                        await airfieldsWeightTypesMapModel.insert({
                            price: req.body[`weight_type[${spaceType}][${weightType.id}][${priceType}]`],
                            airfield_id: newAirfieldId,
                            weight_type_id: weightType.id,
                            space_type: spaceType,
                            price_type: priceType,
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
            bank_name: req.body.bank_name,
        });

        return res.redirect(`/${res.data._module}`);
    }

    async delete(req, res){
        const {id} = req.params;

        await this.model.deleteById(id);

        return res.redirect(`/${res.data._module}`);
    };
};