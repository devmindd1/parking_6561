const RunwayTypeModel = require('../../models/RunwayTypeModel.js');
const {validationResult} = require('express-validator');

exports.index = async function(req, res){
    const runwayTypeModel = new RunwayTypeModel();

    res.data.items = await runwayTypeModel.getAll();

    return res.render('admin/runway-types/index', res.data);
};

exports.create = async function(req, res){
    if(req.method === 'GET')
        return res.render('admin/runway-types/create', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/runway-types/create', res.data);
    }

    const runwayTypeModel = new RunwayTypeModel();

    await runwayTypeModel.insert(req.body);

    return res.redirect('/admin/runway-types');
};

exports.edit = async function(req, res){
    const {id} = req.params;
    const runwayTypeModel = new RunwayTypeModel();

    res.data.model = await runwayTypeModel.getById(id);
    if(req.method === 'GET')
        return res.render('admin/colors/edit', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/runway-types/edit', res.data);
    }

    await runwayTypeModel.update(id, req.body);

    return res.redirect('/admin/runway-types');
};

exports.delete = async function(req, res){
    const {id} = req.params;
    const runwayTypeModel = new RunwayTypeModel();

    await runwayTypeModel.deleteById(id);

    return res.redirect('/admin/runway-types');
};