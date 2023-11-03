const {body} = require("express-validator");

const insertWeightTypeBody = [
    body('title').notEmpty()
        .withMessage('Title is require')
];

module.exports = {
    insertWeightTypeBody,
};
