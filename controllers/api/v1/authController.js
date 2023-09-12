const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const UserModel = require('../../../models/UserModel');
const UsersTokenModel = require('../../../models/UsersTokenModel');
const {generateTokens, validateRefreshToken} = require('../../../services/tokenService');
const UserDto = require('../../../dtos/UserDto');
const {upload} = require('../../../helpers/uploadHelper');
const {userProfileImgPath} = require('../../../config/defaults');

exports.connect = async function(req, res){
    res.data.user = req.user;

    return res.status(200).json(res.data);
};

exports.logout = async function(req, res){
    const usersTokenModel = new UsersTokenModel();

    await usersTokenModel.deleteTokens(req.user.id);

    return res.status(200).json(res.data);
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

exports.signUp = async function(req, res){
    const userModel = new UserModel();
    const usersTokenModel = new UsersTokenModel();
    const user = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    if(req.files && req.files['img'])
        user.img = await upload(req.files['img'], userProfileImgPath);

    delete user.confirm_password;
    user.password = await bcrypt.hash(user.password, 3);
    user.id = await userModel.insert(user);

    res.data.user = new UserDto(user);
    res.data.tokens = generateTokens({...res.data.user});

    await usersTokenModel.updateTokens(user.id, res.data.tokens);

    return res.json(res.data);
};

exports.login = async function(req, res){
    const {email, password} = req.body;
    const userModel = new UserModel();
    const usersTokenModel = new UsersTokenModel();

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    const user = await userModel.getByEmail(email);
    if(!user || !(await bcrypt.compare(password, user.password))){
        res.data.errorMessage = 'email or password is wrong';
        return res.status(400).json(res.data);
    }

    res.data.user = new UserDto(user);
    res.data.tokens = await generateTokens({...res.data.user});

    await usersTokenModel.updateTokens(user.id, res.data.tokens);

    return res.status(200).json(res.data);
};