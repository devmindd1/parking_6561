const Model = require('../../models/AmenityTypeModel.js');
const {validationResult} = require('express-validator');

const _module = 'amenity-types';

exports.index = async function(req, res){
    res.data.module = _module;

    const _model = new Model();

    res.data.items = await _model.getAll();

    return res.render(`admin/${_module}/index`, res.data);
};

exports.create = async function(req, res){
    res.data.module = _module;

    if(req.method === 'GET')
        return res.render(`admin/${_module}/create`, res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render(`admin/${_module}/create`, res.data);
    }

    const _model = new Model();
    await _model.insert(req.body);

    return res.redirect(`/admin/${_module}`);
};

exports.edit = async function(req, res){
    res.data.module = _module;
    const {id} = req.params;

    const _model = new Model();

    res.data.model = await _model.getById(id);
    if(req.method === 'GET')
        return res.render(`admin/${_module}/edit`, res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render(`admin/${_module}/edit`, res.data);
    }

    await _model.update(id, req.body);

    return res.redirect(`/admin/${_module}`);
};

exports.delete = async function(req, res){
    const {id} = req.params;

    const _model = new Model();
    await _model.deleteById(id);

    return res.redirect(`/admin/${_module}`);
};
