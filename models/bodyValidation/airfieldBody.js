const {body, check, param, query} = require("express-validator");
const AirfieldModel = require("../../models/AirfieldModel");

const insertBody = [
    check('airfield_images').custom(async (value, {req}) => {
        const inputName = 'airfield_images';

        if(!req.files || !req.files[inputName])
            throw new Error('airfield_images is required');

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

        if(!req.files || !req.files[inputName])
            return;

        const file = req.files[inputName];
        const [type, ext] = file.mimetype.split('/');

        if(type !== 'image')
            throw new Error('img is not image type');
    }),
    body('spaces_count').isInt({ min: 1})
        .withMessage('spaces_count > 1'),
    body('hangar_count').isInt({ min: 0})
        .withMessage('hangar_count >= 0'),
    body('parking_count').isInt({ min: 0})
        .withMessage('parking_count >= 0'),
    body('airfield_stripe_account_id').notEmpty()
        .withMessage('airfield_stripe_account_id is require'),
    body('manager_name').notEmpty()
        .withMessage('manager name is require'),
    body('short_hr_price_eur').isNumeric()
        .withMessage('short_hr_price_eur name is numeric'),
    body('long_day_price_eur').isNumeric()
        .withMessage('long_day_price_eur name is require'),
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
        .withMessage('Address name is require')
];

const getByIdBody = [
    param('airfieldId').notEmpty()
        .withMessage('airfieldId is require')
];

const getFiltered = [
    query('spaceType').notEmpty()
        .withMessage('spaceType is require')
];

const bookBody = [
    body('dateStart').notEmpty()
        .withMessage('dateStart is require'),
    body('dateEnd').notEmpty()
        .withMessage('dateEnd is require'),
    body('oaciId').notEmpty()
        .withMessage('oaciId is require'),
    body('paymentMethod').notEmpty()
        .withMessage('paymentMethod is require'),
    body('paymentMethod').isInt({ min: 0, max: 1})
        .withMessage('paymentMethod is INT 0 || 1'),
];

module.exports = {
    insertBody,
    getByIdBody,
    getFiltered,
    bookBody
};
