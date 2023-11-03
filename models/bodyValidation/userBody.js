const {body} = require("express-validator");
const UserModel = require("../UserModel");

const adminLoginBody = [
    body('email').notEmpty()
        .withMessage('Email is require'),
    body('password').notEmpty()
        .withMessage('Password is require'),
];

const loginBody = [
    body('email').notEmpty()
        .withMessage('Email is require'),
    body('password').notEmpty()
        .withMessage('Password is require'),
];

const forgotPasswordBody = [
    body('email').notEmpty()
        .withMessage('Email is require'),
    body('email').isEmail().normalizeEmail().withMessage('please write true email')
        .custom(async value => {
            const userModel = new UserModel();

            return userModel.checkEmailExists(value).then(has => {
                if(!has) throw new Error('Email is not exists');
            });
        }),
];

const recoverPasswordBody = [
    body('password').isLength({ min: 6 })
        .withMessage('password min size 6 symbols'),
    body('password').notEmpty()
        .withMessage('Password is require'),
    body('confirm_password').notEmpty()
        .withMessage('confirm_password require'),
    body('confirm_password').custom(async (value, {req}) => {
        if(req.body.password !== value)
            throw new Error('Password dont much the confirm_password');
    })
];

const signUpBody = [
    body('stripe_card_token').notEmpty()
        .withMessage('stripe_card_token is require'),
    body('stripe_card_id').notEmpty()
        .withMessage('stripe_card_id is require'),
    body('additional_qualifications').notEmpty()
        .withMessage('additional_qualifications is require (one or more)'),
    body('equipments').notEmpty()
        .withMessage('equipments is require (one or more)'),
    body('equipments').custom(async value => {
        if(!Array.isArray(value))
            throw new Error('equipments is array input [ARRAY] with int params');
    }),
    body('country_id').notEmpty()
        .withMessage('country_id is require'),
    body('issue_date').notEmpty()
        .withMessage('issue_date is require'),
    body('issue_date').isDate()
        .withMessage("Invalid day received format (YYYY/MM/DD)"),
    body('license_number').notEmpty()
        .withMessage('license_number is require'),
    body('valid_until_date').notEmpty()
        .withMessage('valid_until_date is require'),
    body('valid_until_date').isDate()
        .withMessage("Invalid day received format (YYYY/MM/DD)"),
    body('issuing_country_id').notEmpty()
        .withMessage('issuing_country_id is require'),
    body('issuing_country_id').isInt()
        .withMessage('issuing_country_id is INT'),
    body('country_id').notEmpty()
        .withMessage('country_id is require'),
    body('email').notEmpty()
        .withMessage('Email is require'),
    body('email').isEmail().normalizeEmail().withMessage('please write true email')
        .custom(async value => {
            const userModel = new UserModel();

            return userModel.checkEmailExists(value).then(has => {
                if(has) throw new Error('Email is exists');
            });
        }),
    body('username').notEmpty()
        .withMessage('username is require'),
    body('password').isLength({ min: 8 })
        .withMessage('password min size 6 symbols'),
    body('password').notEmpty()
        .withMessage('Password is require'),
    body('confirm_password').notEmpty()
        .withMessage('confirm_password require'),
    body('confirm_password').custom(async (value, {req}) => {
        if(req.body.password !== value)
            throw new Error('Password dont much the confirm_password');
    }),
    body('first_name').notEmpty()
        .withMessage('first_name is require'),
    body('last_name').notEmpty()
        .withMessage('last_name is require'),
    body('date_of_birth').notEmpty()
        .withMessage('date_of_birth is require'),
    body('date_of_birth').isDate()
        .withMessage("Invalid day received format (YYYY/MM/DD)"),
    body('weight_type_id').notEmpty()
        .withMessage("weight_type_id is required"),
    body('additional_qualifications').custom(async (value, {req}) => {
        if(!Array.isArray(value))
            throw new Error('additional_qualifications is array input [ARRAY] with int params');

        value.forEach(item => {
            if(!parseInt(item) || typeof parseInt(item) !== 'number')
                throw new Error('additional_qualifications is array input [ARRAY] with int params');
        });
    }),
    body('equipments').custom(async (value, {req}) => {
        if(!Array.isArray(value))
            throw new Error('equipments is array input [ARRAY] with int params');

        value.forEach(item => {
            if(!parseInt(item) || typeof parseInt(item) !== 'number')
                throw new Error('equipments is array input [ARRAY] with int params');
        });
    })
];

const updateBody = [
    body('first_name').notEmpty()
        .withMessage('first_name is require'),
    body('last_name').notEmpty()
        .withMessage('last_name is require'),
    body('email').notEmpty()
        .withMessage('Email is require'),
    body('email').isEmail().normalizeEmail().withMessage('please write true email')
        .custom(async (value, {req}) => {
            const userModel = new UserModel();

            return userModel.checkEmailExists(value, req.user.id).then(has => {
                if(has) throw new Error('Email is exists');
            });
        }),
    body('country_id').notEmpty()
        .withMessage('country_id is require'),
    body('date_of_birth').notEmpty()
        .withMessage('date_of_birth is require'),
    body('date_of_birth').isDate()
        .withMessage("Invalid day received format (YYYY/MM/DD)"),
];

module.exports = {
    signUpBody,
    adminLoginBody,
    loginBody,
    forgotPasswordBody,
    recoverPasswordBody,
    updateBody
};
