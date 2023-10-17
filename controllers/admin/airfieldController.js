const AirfieldModel = require('../../models/AirfieldModel.js');
const AirfieldsSourceModel = require('../../models/AirfieldsSourceModel.js');
const RunwayTypeModel = require('../../models/RunwayTypeModel.js');
const AirfieldsRunwayTypesMapModel = require('../../models/AirfieldsRunwayTypesMapModel.js');
const AirfieldsStripeAccountModel = require('../../models/AirfieldsStripeAccountModel.js');
const AirfieldsStripeAccountsBankModel = require('../../models/AirfieldsStripeAccountsBankModel.js');

exports.index = async function(req, res){
    const airfieldModel = new AirfieldModel();

    res.data.items = await airfieldModel.getAllOwnersAirfields();
    res.data.statuses = AirfieldModel._STATUSES;

    return res.render('admin/airfields/index', res.data);
};

exports.edit = async function(req, res){
    const {id} = req.params;
    const airfieldModel = new AirfieldModel();
    const airfieldsSourceModel = new AirfieldsSourceModel();
    const runwayTypeModel = new RunwayTypeModel();
    const airfieldsRunwayTypesMapModel = new AirfieldsRunwayTypesMapModel();
    const airfieldsStripeAccountModel = new AirfieldsStripeAccountModel();
    const airfieldsStripeAccountsBankModel = new AirfieldsStripeAccountsBankModel();

    res.data.airfield =  await airfieldModel.getById(id);
    res.data.airfieldPhotos =  await airfieldsSourceModel.getByAirfieldId(id);
    res.data.runwayTypes =  await runwayTypeModel.getAllIndexedById();
    res.data.airfieldRunways =  await airfieldsRunwayTypesMapModel.getByAirfieldId(id);
    res.data.stripeAccount =  await airfieldsStripeAccountModel.getByAirfieldId(id);
    res.data.stripeAccountBanks =  await airfieldsStripeAccountsBankModel.getByAirfieldStripeAccountId(res.data.stripeAccount.id);

    res.data.statuses =  AirfieldModel._STATUSES;

    return res.render("admin/airfields/edit", res.data);
};

exports.update = async function(req, res){
    const {id} = req.params;
    const {airfield_status} = req.body;

    const airfieldModel = new AirfieldModel();

    res.data.status = airfield_status;

    await airfieldModel.update(id, {
        status: airfield_status
    });

    return res.redirect("/admin/airfields");
};