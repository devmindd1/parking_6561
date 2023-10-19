const {body} = require("express-validator");

const insertCardBody = [
    body('stripe_card_token').notEmpty()
        .withMessage('stripe_card_token is require'),
    body('stripe_card_id').notEmpty()
        .withMessage('stripe_card_id is require'),
];

module.exports = {
    insertCardBody,
};
