const {validationResult} = require('express-validator');
const {string2sha1} = require('../../helpers/stringHelper.js');
const UserModel = require('../../models/UserModel.js');
const AirfieldModel = require('../../models/AirfieldModel.js');

exports.index = async function(req, res){
    const userModel = new UserModel();

    const owners = await userModel.getAllOwners();

    console.log(owners);

    return res.render('admin/owners/index', {
        items: owners,
        statuses: AirfieldModel._STATUSES
    });
};

exports.edit = async function(req, res){

    console.log(req.user);

    res.render("admin/home/edit",  {user: req.user});
};

exports.update = async function(req, res){
    let userModel = new UserModel();
    let errors = validationResult(req);

    if(!errors.errors.length){
        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };

        if(req.body.password)
            userData.password = string2sha1(req.body.password);

        await userModel.updateById(req.user.id, userData);

        res.redirect("/admin");
    }

    res.render("admin/home/edit",  {user: req.user, errorsArray: errors.array()});
};