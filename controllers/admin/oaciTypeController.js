const OaciTypeModel = require('../../models/OaciTypeModel.js');
const {validationResult} = require('express-validator');

exports.index = async function(req, res){
    const oaciTypeModel = new OaciTypeModel();

    res.data.items = await oaciTypeModel.getAll();

    return res.render('admin/oaci-types/index', res.data);
};

exports.create = async function(req, res){
    if(req.method === 'GET')
        return res.render('admin/oaci-types/create', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/oaci-types/create', res.data);
    }

    const oaciTypeModel = new OaciTypeModel();

    await oaciTypeModel.insert(req.body);

    return res.redirect('/admin/oaci-types');
};

exports.edit = async function(req, res){
    const {id} = req.params;
    const oaciTypeModel = new OaciTypeModel();

    res.data.model = await oaciTypeModel.getById(id);
    if(req.method === 'GET')
        return res.render('admin/oaci-types/edit', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/oaci-types/edit', res.data);
    }

    await oaciTypeModel.update(id, req.body);

    return res.redirect('/admin/oaci-types');
};

exports.delete = async function(req, res){
    const {id} = req.params;
    const oaciTypeModel = new OaciTypeModel();

    await oaciTypeModel.deleteById(id);

    return res.redirect('/admin/oaci-types');
};
