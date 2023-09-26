const {body} = require("express-validator");

const oaciTypeInsertBody = [
    body('oaci_code').notEmpty()
        .withMessage('Card number is require'),
    body('airfield_name').notEmpty()
        .withMessage('Airfield name is require'),
    body('city').notEmpty()
        .withMessage('City is require'),
    body('city').isAlpha('en-US', {ignore: ' '})
        .withMessage('only en-US alpha and ( spaces )'),
    body('runways_count').isInt().optional({checkFalsy: true})
        .withMessage('Runways count is integer'),
];

module.exports = {
    oaciTypeInsertBody
};
