const {validationResult} = require('express-validator');
const {string2sha1, randomString} = require('../helpers/stringHelper');
const UserModel = require('../models/UserModel');
const UserDto = require('../dtos/UserDto');
const UsersTokenModel = require('../models/UsersTokenModel');
const {validateRefreshToken, generateTokens} = require('../services/tokenService');

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

exports.refresh = async function(req, res){
    const userModel = new UserModel();
    const usersTokenModel = new UsersTokenModel();

    const {refreshToken} = req.body;
    if(!refreshToken)
        return res.status(401).json(req.response);

    const userData = validateRefreshToken(refreshToken);
    if(!userData)
        return res.status(401).json(res.data);

    const userToken = await usersTokenModel.getByRefreshToken(refreshToken);
    if(!userToken)
        return res.status(401).json(res.data);

    const user = await userModel.getById(userToken.user_id);
    res.data.user = new UserDto(user);
    res.data.tokens = generateTokens({...res.data.user});

    await usersTokenModel.updateTokens(user.id, res.data.tokens);

    return res.status(200).json(res.data);
};