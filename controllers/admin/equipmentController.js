const EquipmentTypeModel = require('../../models/EquipmentTypeModel.js');
const {validationResult} = require('express-validator');

exports.index = async function(req, res){
    const equipmentTypeModel = new EquipmentTypeModel();

    res.data.items = await equipmentTypeModel.getAll();

    return res.render('admin/equipments/index', res.data);
};

exports.create = async function(req, res){
    if(req.method === 'GET')
        return res.render('admin/equipments/create', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/equipments/create', res.data);
    }

    const equipmentTypeModel = new EquipmentTypeModel();

    await equipmentTypeModel.insert(req.body);

    return res.redirect('/admin/equipments');
};

exports.edit = async function(req, res){
    const {id} = req.params;
    const equipmentTypeModel = new EquipmentTypeModel();

    res.data.model = await equipmentTypeModel.getById(id);
    if(req.method === 'GET')
        return res.render('admin/equipments/edit', res.data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return res.render('admin/equipments/edit', res.data);
    }

    await equipmentTypeModel.update(id, req.body);

    return res.redirect('/admin/equipments');
};

exports.delete = async function(req, res){
    const {id} = req.params;
    const equipmentTypeModel = new EquipmentTypeModel();

    await equipmentTypeModel.deleteById(id);

    return res.redirect('/admin/equipments');
};
