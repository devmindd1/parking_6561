const {body} = require("express-validator");

const insertEquipmentBody = [
    body('title').notEmpty()
        .withMessage('Title is require')
];

module.exports = {
    insertEquipmentBody,
};
