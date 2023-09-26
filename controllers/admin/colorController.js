const ColorModel = require('../../models/ColorModel.js');
const {validationResult} = require('express-validator');

exports.index = async function(req, res){
    const colorModel = new ColorModel();

    res.data.items = await colorModel.getAll();

    return res.render('admin/colors/index', res.data);
};

exports.create = async function(req, res){
    if(req.method === 'GET')
        return res.render('admin/colors/create', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/colors/create', res.data);
    }

    const colorModel = new ColorModel();

    await colorModel.insert(req.body);

    return res.redirect('/admin/colors');
};

exports.edit = async function(req, res){
    const {id} = req.params;
    const colorModel = new ColorModel();

    res.data.model = await colorModel.getById(id);
    if(req.method === 'GET')
        return res.render('admin/colors/edit', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/colors/edit', res.data);
    }

    await colorModel.update(id, req.body);

    return res.redirect('/admin/colors');
};

exports.delete = async function(req, res){
    const {id} = req.params;
    const colorModel = new ColorModel();

    await colorModel.deleteById(id);

    return res.redirect('/admin/colors');
};