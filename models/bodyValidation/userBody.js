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

const signUpBody = [
    body('card_number').notEmpty()
        .withMessage('card_number is require'),
    body('card_number').isCreditCard()
        .withMessage('card number not valid'),
    body('card_cvv').notEmpty().isLength({ min: 3, max: 3 })
        .withMessage('card_cvv is require (min 3 max 3)'),
    body('card_date').notEmpty()
        .custom(async value => {
            if(!(/\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/.test(value)))
                throw new Error('card_date is not valid (MM/YY)');
        }),
    body('card_name').isAlpha('en-US', {ignore: ' '})
        .withMessage('only en-US alpha and ( spaces )'),
    body('card_name').notEmpty().isAlpha('en-US', {ignore: ' '})
        .withMessage('card_name is require'),
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
];

module.exports = {
    signUpBody,
    adminLoginBody,
    loginBody
};
