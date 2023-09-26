const AdditionalQualificationTypeModel = require('../../models/AdditionalQualificationTypeModel.js');
const {validationResult} = require('express-validator');

exports.index = async function(req, res){
    const additionalQualificationTypeModel = new AdditionalQualificationTypeModel();

    res.data.items = await additionalQualificationTypeModel.getAll();

    return res.render('admin/additional-qualifications/index', res.data);
};

exports.create = async function(req, res){
    if(req.method === 'GET')
        return res.render('admin/additional-qualifications/create', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/additional-qualifications/create', res.data);
    }

    const additionalQualificationTypeModel = new AdditionalQualificationTypeModel();

    await additionalQualificationTypeModel.insert(req.body);

    return res.redirect('/admin/additional-qualifications');
};

exports.edit = async function(req, res){
    const {id} = req.params;
    const additionalQualificationTypeModel = new AdditionalQualificationTypeModel();

    res.data.model = await additionalQualificationTypeModel.getById(id);
    if(req.method === 'GET')
        return res.render('admin/colors/edit', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/additional-qualifications/edit', res.data);
    }

    await additionalQualificationTypeModel.update(id, req.body);

    return res.redirect('/admin/additional-qualifications');
};

exports.delete = async function(req, res){
    const {id} = req.params;
    const additionalQualificationTypeModel = new AdditionalQualificationTypeModel();

    await additionalQualificationTypeModel.deleteById(id);

    return res.redirect('/admin/additional-qualifications');
};