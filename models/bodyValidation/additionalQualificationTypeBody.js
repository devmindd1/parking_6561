const {body} = require("express-validator");

const additionalQualificationTypeInsertBody = [
    body('title').notEmpty()
        .withMessage('title is require'),
];

module.exports = {
    additionalQualificationTypeInsertBody
};
