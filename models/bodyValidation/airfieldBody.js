const {body, check} = require("express-validator");
const AirfieldModel = require("../../models/AirfieldModel");

const insertBody = [
    check('airfield_images').custom(async (value, {req}) => {
        const inputName = 'airfield_images';

        if(!req.files || !req.files[inputName]) return;

        if(!Array.isArray(req.files[inputName]))
            req.files[inputName] = [req.files[inputName]];

        req.files[inputName].forEach(file => {
            const [type, ext] = file.mimetype.split('/');

            if(type !== 'image')
                throw new Error('images only images types');
        });
    }),

    check('operating_license_img').custom(async (value, {req}) => {
        const inputName = 'operating_license_img';

        if(!req.files || !req.files[inputName]) return;

        const file = req.files[inputName];
        const [type, ext] = file.mimetype.split('/');

        if(type !== 'image')
            throw new Error('img is not image type');
    }),
    body('manager_name').notEmpty()
        .withMessage('manager name is require'),
    body('short_hr_price_eur').isNumeric()
        .withMessage('short_hr_price_eur name is numeric'),
    body('long_hr_price_eur').isNumeric()
        .withMessage('long_hr_price_eur name is require'),
    body('primary_email').notEmpty()
        .withMessage('Email is require'),
    body('primary_email').isEmail().normalizeEmail().withMessage('please write true email')
        .custom(async (value, {req}) => {
            const airfieldModel = new AirfieldModel();

            return airfieldModel.checkPrimaryEmailExists(req.user.id, value).then(has => {
                if(has) throw new Error('Primary email is exists');
            });
        }),
    body('runway_type_ids').notEmpty()
        .withMessage('runway_type_ids is require'),
    body('address').notEmpty()
        .withMessage('Address name is require'),
];

module.exports = {
    insertBody,
};
