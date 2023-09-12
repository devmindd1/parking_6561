const tokenMaxAge = 60000*60*24*15;
const {validationResult} = require('express-validator');
const UserModel = require('../../models/UserModel.js');
const {string2sha1, randomString} = require('../../helpers/stringHelper.js');

exports.index = function(req, res){
    res.render("admin/auth/login");
};

exports.login = async function(req, res){
    const userModel = new UserModel();
    let errors = validationResult(req);
    let errorMessage = 'email or password is wrong';

    if(errors.errors.length){
        errorMessage = [...errors.array().map(item => item.msg)].join('\n');
        return res.render("admin/auth/login", {errorMessage: errorMessage});
    }

    const [user] = await userModel.getAdminByEmailPassword(req.body.email, string2sha1(req.body.password));

    console.log(user);

    if(!user)
        return res.render("admin/auth/login", {errorMessage: errorMessage});

    const token = randomString(32);
    await userModel.updateToken(user.id, token);

    res.cookie('adminUToken', token , {maxAge: tokenMaxAge});
    res.redirect("/admin");
};