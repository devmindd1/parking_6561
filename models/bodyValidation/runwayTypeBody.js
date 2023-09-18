const {body} = require("express-validator");

const insertRunwayTypeBody = [
    body('title').notEmpty()
        .withMessage('Title is require')
];

module.exports = {
    insertRunwayTypeBody,
};
