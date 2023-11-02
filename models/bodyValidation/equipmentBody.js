const {body} = require("express-validator");

const insertEquipmentTypeBody = [
    body('title').notEmpty()
        .withMessage('Title is require')
];

module.exports = {
    insertEquipmentTypeBody,
};
