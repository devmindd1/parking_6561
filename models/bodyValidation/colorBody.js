const {body} = require("express-validator");

const insertColorBody = [
    body('title').notEmpty()
        .withMessage('Title is require')
];

module.exports = {
    insertColorBody,
};
