const {validate} = require('../../core/validator');
const Model = require('../../models/AdditionalQualificationTypeModel.js');

module.exports = class AdditionalQualificationTypeController{
    constructor(req, res, next, action){
        this.model = new Model();
        res.data._module = 'additional-qualification-types';
        res.data._name = 'Additional qualification types';

        this[action](req, res, next);
    }

    async index(req, res){
        res.data.items = await this.model.getAll();

        return res.render(`admin/${res.data._module}/index`, res.data);
    }

    async create(req, res){
        if(req.method === 'GET' || !validate(req, res))
            return res.render(`admin/${res.data._module}/create`, res.data);

        await this.model.insert(req.body);

        return res.redirect(`/admin/${res.data._module}`);
    }

    async edit(req, res){
        res.data.id = req.params.id;
        res.data.model = await this.model.getById(res.data.id);

        if(req.method === 'GET' || !validate(req, res))
            return res.render(`admin/${res.data._module}/edit`, res.data);

        await this.model.update(res.data.id, req.body);

        return res.redirect(`/admin/${res.data._module}`);
    }

    async delete(req, res){
        const {id} = req.params;

        await this.model.deleteById(id);

        return res.redirect(`/admin/${res.data._module}`);
    };
};