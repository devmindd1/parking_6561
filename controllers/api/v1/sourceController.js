const AdditionalQualificationTypeModel = require('../../../models/AdditionalQualificationTypeModel');
const RegistrationNumberModel = require('../../../models/RegistrationNumberModel');
const EquipmentTypeModel = require('../../../models/EquipmentTypeModel');
const CountryModel = require('../../../models/CountryModel');
const ColorModel = require('../../../models/ColorModel');

exports.authSource = async function(req, res){
    const colorModel = new ColorModel();
    const countryModel = new CountryModel();
    const equipmentTypeModel = new EquipmentTypeModel();
    const additionalQualificationTypeModel = new AdditionalQualificationTypeModel();

    res.data.colors = await colorModel.getAll();
    res.data.countries = await countryModel.getAll();
    res.data.equipmentTypes = await equipmentTypeModel.getAll();
    res.data.additionalQualificationTypes = await additionalQualificationTypeModel.getAll();

    return res.status(200).json(res.data);
};

exports.aircraftInfoFiltered = async function(req, res){
    const {keyword} = req.params;

    const registrationNumberModel = new RegistrationNumberModel();

    res.data.aircrafts = await registrationNumberModel.getFiltered({keyword});

    return res.status(200).json(res.data);
};