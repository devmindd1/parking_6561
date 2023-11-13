const {validate} = require('../../core/validator');
const Model = require('../../models/UserModel.js');
const {string2sha1} = require('../../helpers/stringHelper.js');

module.exports = class ManagerController{
    constructor(req, res, next, action){
        this.model = new Model();
        res.data._module = 'managers';
        res.data._name = 'Managers';

        this[action](req, res, next);
    }

    async index(req, res){
        res.data.items = await this.model.getOwners();

        return res.render(`admin/${res.data._module}/index`, res.data);
    }

    async create(req, res){
        if(req.method === 'GET' || !validate(req, res))
            return res.render(`admin/${res.data._module}/create`, res.data);

        await this.model.insert({
            aircraft_id: 0, // TODO ete foreign key drvi registration_numbers ic sra vra stex 0 chi @nduni
            stripe_customer_id: '',
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: string2sha1(req.body.password),
            date_of_birth: req.body.date_of_birth,
            role: Model._ROLES['owner']
        });

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