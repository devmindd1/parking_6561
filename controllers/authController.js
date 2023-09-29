const {validationResult} = require('express-validator');
const {string2sha1, randomString} = require('../helpers/stringHelper');
const UserModel = require('../models/UserModel');

exports.index = function(req, res){
    return res.render('auth/login');
};

exports.logout = async function(req, res){
    const userModel = new UserModel();

    res.clearCookie('UToken');

    await userModel.updateToken(req.user.id, null);

    return res.redirect('login');
};

exports.login = async function(req, res){
    if(req.method === 'POST'){
        const userModel = new UserModel();

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.data.validationErrors = errors.array();
            return res.render('auth/login');
        }

        const user = await userModel.getOwnerByEmailPassword(req.body.email, string2sha1(req.body.password));
        if(!user)
            return res.render("auth/login", {errorMessage: 'error'});

        const token = randomString(32);
        await userModel.updateToken(user.id, token);

        res.cookie('UToken', token , {maxAge: UserModel._ownerTokenMaxAge});
        return res.redirect("/");
    }

    return res.render('auth/login');
};