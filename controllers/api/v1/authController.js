const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const {baseUrlApi} = require('../../../config/defaults');
const UserModel = require('../../../models/UserModel');
const UsersTokenModel = require('../../../models/UsersTokenModel');
const UsersEquipmentTypesMapModel = require('../../../models/UsersEquipmentTypesMapModel');
const UsersAdditionalQualificationTypesMapModel = require('../../../models/UsersAdditionalQualificationTypesMapModel');
const UsersCardsModel = require('../../../models/UsersCardsModel');
const {generateTokens, validateRefreshToken} = require('../../../services/tokenService');
const UserDto = require('../../../dtos/UserDto');
const StripeService = require('../../../services/StripeService');
const {randomString} = require('../../../helpers/stringHelper');
const MailHelper = require('../../../helpers/MailHelper');

exports.recoverPasswordValidate = function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    return res.status(200).json(res.data);
};

exports.recoverPassword = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    const userModel = new UserModel();

    await userModel.update(req.user.id, {
        password: await bcrypt.hash(req.body.password, 3),
        forgot_password_token: null
    });

    res.data.message = 'password recover success';

    return res.status(200).json(res.data);
};

exports.forgotPassword = async function(req, res){
    const {email} = req.body;
    const userModel = new UserModel();
    const forgotPasswordToken = randomString(40);
    const recoverEmailUrl = baseUrlApi + 'recover-password/' + forgotPasswordToken;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    await userModel.updateByEmail(email, {
        forgot_password_token: forgotPasswordToken
    });

    await MailHelper.sendMail(email, 'recover password',
        `Dear user,
         To verify your email, click on this link: ${recoverEmailUrl}
         If you did not create an account, then ignore this email.`
    );

    return res.status(200).json(res.data);
};

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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    const user = req.body;
    const userModel = new UserModel();
    const stripe = new StripeService();
    const usersTokenModel = new UsersTokenModel();
    const usersCardsModel = new UsersCardsModel();
    const usersEquipmentTypesMapModel = new UsersEquipmentTypesMapModel();
    const usersAdditionalQualificationTypesMapModel = new UsersAdditionalQualificationTypesMapModel();

    const customer = await stripe._call('createCustomer', [{
        description: `${req.body.first_name} ${req.body.last_name} ${req.body.email}`,
        source: req.body.stripe_card_token,
    }]);

    if(!customer.success){
        res.data.errorMessage = customer.error.message;
        return res.status(400).json(res.data);
    }

    user.id = await userModel.insert({
        role: UserModel._ROLES['user'],
        email: req.body.email,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: await bcrypt.hash(user.password, 3),
        country_id: req.body.country_id,
        date_of_birth: req.body.date_of_birth,
        home_base: req.body.home_base || '',
        aircraft_id: req.body.aircraft_id,
        color_id: req.body.color_id || 0,
        color_id_1: req.body.color_id_1 || 0,
        issue_date: req.body.issue_date,
        license_number: req.body.license_number,
        valid_until_date: req.body.valid_until_date,
        issuing_country_id: req.body.issuing_country_id,
        weight_type_id: req.body.weight_type_id,
        stripe_customer_id: customer.data.id
    });

    for(const equipment of req.body.equipments)
        await usersEquipmentTypesMapModel.insert({
            user_id: user.id,
            equipment_type_id: equipment
        });

    for(const qualification of req.body.additional_qualifications)
        await usersAdditionalQualificationTypesMapModel.insert({
            user_id: user.id,
            additional_qualification_type_id: qualification
        });

    await usersCardsModel.insert({
        user_id: user.id,
        source_id: req.body.stripe_card_id
    });

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