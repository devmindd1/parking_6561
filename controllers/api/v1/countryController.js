const CountryModel = require('../../../models/CountryModel');

exports.list = async function(req, res){
    const countryModel = new CountryModel();

    res.data.countries = await countryModel.getAll();

    return res.status(200).json(res.data);
};