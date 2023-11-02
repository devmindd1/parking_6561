const {body} = require("express-validator");

const amenityTypeInsertBody = [
    body('title').notEmpty()
        .withMessage('title is require'),
];

module.exports = {
    amenityTypeInsertBody
};
