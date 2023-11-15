const {body, check, param, query} = require("express-validator");
const AirfieldModel = require("../../models/AirfieldModel");
const UsersCardsModel = require("../../models/UsersCardsModel");

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
    body('manager_name').notEmpty()
        .withMessage('manager name is require'),
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

    body('bank_first_name').notEmpty()
        .withMessage('bank first_name is require'),
    body('bank_last_name').notEmpty()
        .withMessage('bank last_name is require'),
    body('bank_account_name').notEmpty()
        .withMessage('bank account_name is require'),
    body('bank_name').notEmpty()
        .withMessage('bank bank_name is require'),
    body('bank_bic').notEmpty()
        .withMessage('bank bic is require'),
    body('bank_iban_number').notEmpty()
        .withMessage('bank iban_number is require'),
    body('bank_email').notEmpty()
        .withMessage('bank email is require'),
    body('bank_phone').notEmpty()
        .withMessage('bank phone is require'),
    body('bank_country_code').notEmpty()
        .withMessage('bank country_code is require'),
];

const getByIdBody = [
    param('airfieldId').notEmpty()
        .withMessage('airfieldId is require')
];

const getFiltered = [
    query('spaceType').notEmpty()
        .withMessage('spaceType is require')
];

const bookCalcBody = [
    body('dateStart').notEmpty()
        .withMessage('dateStart is require'),
    body('dateEnd').notEmpty()
        .withMessage('dateEnd is require'),
    body('oaciId').notEmpty()
        .withMessage('oaciId is require'),
    body('spaceType').notEmpty()
        .withMessage('spaceType is require'),
];

const bookBody = [
        ...bookCalcBody,
    body('stripeCardId').notEmpty()
        .withMessage('stripeCardId is require'),
    body('stripeCardId').custom(async (value, {req}) => {
            const usersCardsModel = new UsersCardsModel();

            const card = await usersCardsModel.getCardByUserId(req.user.id, value);
            if(!card)
                throw new Error('cardId dont found');
        })
];

module.exports = {
    insertBody,
    getByIdBody,
    getFiltered,
    bookCalcBody,
    bookBody,
};
