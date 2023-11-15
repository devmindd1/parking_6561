const router = new (require('express').Router)();

const auth = require('../controllers/admin/authController.js');
const home = require('../controllers/admin/homeController.js');
const airfield = require('../controllers/admin/airfieldController.js');
const runwayType = require('../controllers/admin/runwayTypeController.js');

const OaciType = require('../controllers/admin/OaciTypeController.js');
const WeightType = require('../controllers/admin/WeightTypeController.js');
const Manager = require('../controllers/admin/ManagerController.js');
const Setting = require('../controllers/admin/SettingController.js');
const AdditionalQualificationType = require('../controllers/admin/AdditionalQualificationTypeController.js');
const AmenityType = require('../controllers/admin/AmenityTypeController.js');
const EquipmentType = require('../controllers/admin/EquipmentTypeController.js');
const Booking = require('../controllers/admin/BookingController.js');

const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware.js');

const {adminLoginBody, adminOwnerInsertBody} = require('../models/bodyValidation/userBody.js');
const {insertRunwayTypeBody} = require('../models/bodyValidation/runwayTypeBody.js');
const {insertEquipmentTypeBody} = require('../models/bodyValidation/equipmentBody.js');
const {additionalQualificationTypeInsertBody} = require('../models/bodyValidation/additionalQualificationTypeBody.js');
const {oaciTypeInsertBody} = require('../models/bodyValidation/oaciTypeBody.js');
const {insertWeightTypeBody} = require('../models/bodyValidation/weightTypeBody.js');
const {amenityTypeInsertBody} = require('../models/bodyValidation/amenityTypesBody.js');


router.get('/login', auth.index);
router.post('/login', [adminLoginBody], auth.login);

router.get('/', [adminAuthMiddleware], home.index);
router.get('/admin', [adminAuthMiddleware], home.index);
router.get('/edit', [adminAuthMiddleware], home.edit);


router.get('/airfields', [adminAuthMiddleware], airfield.index);


router.get('/airfields/edit/:id', [adminAuthMiddleware], airfield.edit);
router.post('/airfields/update/:id', [adminAuthMiddleware], airfield.update);

router.get('/runway-types', [adminAuthMiddleware], runwayType.index);
router.all('/runway-types/create', [adminAuthMiddleware, insertRunwayTypeBody], runwayType.create);
router.all('/runway-types/edit/:id', [adminAuthMiddleware, insertRunwayTypeBody], runwayType.edit);
router.get('/runway-types/delete/:id', [adminAuthMiddleware], runwayType.delete);

router.get('/amenity-types', [adminAuthMiddleware], (...args) => new AmenityType(...args, 'index'));
router.all('/amenity-types/create', [adminAuthMiddleware, amenityTypeInsertBody], (...args) => new AmenityType(...args, 'create'));
router.all('/amenity-types/edit/:id', [adminAuthMiddleware, amenityTypeInsertBody], (...args) => new AmenityType(...args, 'edit'));
router.get('/amenity-types/delete/:id', [adminAuthMiddleware], (...args) => new AmenityType(...args, 'delete'));

router.get('/equipment-types', [adminAuthMiddleware], (...args) => new EquipmentType(...args, 'index'));
router.all('/equipment-types/create', [adminAuthMiddleware, insertEquipmentTypeBody], (...args) => new EquipmentType(...args, 'create'));
router.all('/equipment-types/edit/:id', [adminAuthMiddleware, insertEquipmentTypeBody], (...args) => new EquipmentType(...args, 'edit'));
router.get('/equipment-types/delete/:id', [adminAuthMiddleware], (...args) => new EquipmentType(...args, 'delete'));

router.get('/additional-qualification-types', [adminAuthMiddleware], (...args) => new AdditionalQualificationType(...args, 'index'));
router.all('/additional-qualification-types/create', [adminAuthMiddleware, additionalQualificationTypeInsertBody], (...args) => new AdditionalQualificationType(...args, 'create'));
router.all('/additional-qualification-types/edit/:id', [adminAuthMiddleware, additionalQualificationTypeInsertBody], (...args) => new AdditionalQualificationType(...args, 'edit'));
router.get('/additional-qualification-types/delete/:id', [adminAuthMiddleware], (...args) => new AdditionalQualificationType(...args, 'delete'));

router.get('/oaci-types', [adminAuthMiddleware], (...args) => new OaciType(...args, 'index'));
router.all('/oaci-types/create', [adminAuthMiddleware, oaciTypeInsertBody], (...args) => new OaciType(...args, 'create'));
router.all('/oaci-types/edit/:id', [adminAuthMiddleware, oaciTypeInsertBody], (...args) => new OaciType(...args, 'edit'));
router.get('/oaci-types/delete/:id', [adminAuthMiddleware], (...args) => new OaciType(...args, 'delete'));

router.get('/weight-types', [adminAuthMiddleware], (...args) => new WeightType(...args, 'index'));
router.all('/weight-types/create', [adminAuthMiddleware, insertWeightTypeBody], (...args) => new WeightType(...args, 'create'));
router.all('/weight-types/edit/:id', [adminAuthMiddleware, insertWeightTypeBody], (...args) => new WeightType(...args, 'edit'));
router.get('/weight-types/delete/:id', [adminAuthMiddleware], (...args) => new WeightType(...args, 'delete'));

router.get('/managers', [adminAuthMiddleware], (...args) => new Manager(...args, 'index'));
router.all('/managers/create', [adminAuthMiddleware, adminOwnerInsertBody], (...args) => new Manager(...args, 'create'));
router.all('/managers/edit/:id', [adminAuthMiddleware, adminOwnerInsertBody], (...args) => new Manager(...args, 'edit'));
router.get('/managers/delete/:id', [adminAuthMiddleware], (...args) => new Manager(...args, 'delete'));

router.get('/settings', [adminAuthMiddleware], (...args) => new Setting(...args, 'index'));
router.all('/settings/create', [adminAuthMiddleware], (...args) => new Setting(...args, 'create'));
router.all('/settings/edit/:id', [adminAuthMiddleware], (...args) => new Setting(...args, 'edit'));
router.get('/settings/delete/:id', [adminAuthMiddleware], (...args) => new Setting(...args, 'delete'));

router.get('/bookings/:airfieldId', [adminAuthMiddleware], (...args) => new Booking(...args, 'index'));

module.exports = router;