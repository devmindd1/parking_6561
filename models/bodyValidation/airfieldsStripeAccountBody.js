const {body} = require("express-validator");
const AirfieldsStripeAccountModel = require("../AirfieldsStripeAccountModel");

const accountTokenCreateBody = [
    body('stripe[first_name]').notEmpty()
        .withMessage('first_name is require'),
    body('stripe[last_name]').notEmpty()
        .withMessage('last_name is require'),
    body('stripe[account_name]').notEmpty()
        .withMessage('account_name is require'),
    body('stripe[gender]').notEmpty()
        .withMessage('gender is require'),
    body('stripe[gender]').isIn(['male', 'female'])
        .withMessage('gender is male or female'),
    body('stripe[date_of_birth]').notEmpty()
        .withMessage('date_of_birth is require'),
    body('stripe[date_of_birth]').isDate()
        .withMessage("Invalid day received format (YYYY/MM/DD)"),
    body('stripe[country_code]').notEmpty()
        .withMessage('country_code is require'),
    body('stripe[city]').notEmpty()
        .withMessage('city is require'),
    body('stripe[phone]').notEmpty()
        .withMessage('phone is require'),
    body('stripe[postal_code]').notEmpty()
        .withMessage('postal_code is require'),
    body('stripe[email]').notEmpty()
        .withMessage('Email is require'),
    body('stripe[email]').isEmail().normalizeEmail().withMessage('please write true email')
        .custom(async (value) => {
            const airfieldsStripeAccountModel = new AirfieldsStripeAccountModel();

            return airfieldsStripeAccountModel.checkEmailExists(value).then(has => {
                if(has) throw new Error('Email is exists');
            });
        }),
];

module.exports = {
    accountTokenCreateBody,
};
