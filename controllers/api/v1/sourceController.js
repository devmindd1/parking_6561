const AdditionalQualificationTypeModel = require('../../../models/AdditionalQualificationTypeModel');
const RegistrationNumberModel = require('../../../models/RegistrationNumberModel');
const EquipmentTypeModel = require('../../../models/EquipmentTypeModel');
const CountryModel = require('../../../models/CountryModel');
const OaciTypeModel = require('../../../models/OaciTypeModel');
const WeightTypeModel = require('../../../models/WeightTypeModel');

exports.authSource = async function(req, res){
    const countryModel = new CountryModel();
    const equipmentTypeModel = new EquipmentTypeModel();
    const oaciTypeModel = new OaciTypeModel();
    const weightTypeModel = new WeightTypeModel();
    const additionalQualificationTypeModel = new AdditionalQualificationTypeModel();

    res.data.countries = await countryModel.getAll();
    res.data.equipmentTypes = await equipmentTypeModel.getAll();
    res.data.additionalQualificationTypes = await additionalQualificationTypeModel.getAll();
    res.data.oaciList = await oaciTypeModel.getAll();
    res.data.weightTypes = await weightTypeModel.getAll();

    return res.status(200).json(res.data);
};

exports.aircraftInfoFiltered = async function(req, res){
    const {keyword} = req.params;

    const registrationNumberModel = new RegistrationNumberModel();

    res.data.aircrafts = await registrationNumberModel.getFiltered({keyword});

    return res.status(200).json(res.data);
};