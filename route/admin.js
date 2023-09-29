const router = new (require('express').Router);

const auth = require('../controllers/admin/authController.js');
const home = require('../controllers/admin/homeController.js');
const owner = require('../controllers/admin/ownerController.js');
const airfield = require('../controllers/admin/airfieldController.js');
const runwayType = require('../controllers/admin/runwayTypeController.js');
const color = require('../controllers/admin/colorController.js');
const equipment = require('../controllers/admin/equipmentController.js');
const additionalQualification = require('../controllers/admin/additionalQualificationController.js');
const oaciType = require('../controllers/admin/oaciTypeController.js');
const amenityType = require('../controllers/admin/amenityTypeController.js');

const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware.js');

const {adminLoginBody} = require('../models/bodyValidation/userBody.js');
const {insertRunwayTypeBody} = require('../models/bodyValidation/runwayTypeBody.js');
const {insertColorBody} = require('../models/bodyValidation/colorBody.js');
const {insertEquipmentBody} = require('../models/bodyValidation/equipmentBody.js');
const {oaciTypeInsertBody} = require('../models/bodyValidation/oaciTypeBody.js');


router.get('/login', auth.index);
router.post('/login', [adminLoginBody], auth.login);

router.get('/', [adminAuthMiddleware], home.index);
router.get('/admin', [adminAuthMiddleware], home.index);
router.get('/edit', [adminAuthMiddleware], home.edit);



router.get('/owners', [adminAuthMiddleware], owner.index);
router.get('/airfields', [adminAuthMiddleware], airfield.index);


router.get('/airfields/edit/:id', [adminAuthMiddleware], airfield.edit);
router.post('/airfields/update/:id', [adminAuthMiddleware], airfield.update);

router.get('/runway-types', [adminAuthMiddleware], runwayType.index);
router.all('/runway-types/create', [adminAuthMiddleware, insertRunwayTypeBody], runwayType.create);
router.all('/runway-types/edit/:id', [adminAuthMiddleware, insertRunwayTypeBody], runwayType.edit);
router.get('/runway-types/delete/:id', [adminAuthMiddleware], color.delete);

router.get('/colors', [adminAuthMiddleware], color.index);
router.all('/colors/create', [adminAuthMiddleware, insertColorBody], color.create);
router.all('/colors/edit/:id', [adminAuthMiddleware, insertColorBody], color.edit);
router.get('/colors/delete/:id', [adminAuthMiddleware], color.delete);

router.get('/equipments', [adminAuthMiddleware], equipment.index);
router.all('/equipments/create', [adminAuthMiddleware, insertEquipmentBody], equipment.create);
router.all('/equipments/edit/:id', [adminAuthMiddleware, insertEquipmentBody], equipment.edit);
router.get('/equipments/delete/:id', [adminAuthMiddleware], equipment.delete);

router.get('/additional-qualifications', [adminAuthMiddleware], additionalQualification.index);
router.all('/additional-qualifications/create', [adminAuthMiddleware], additionalQualification.create);
router.all('/additional-qualifications/edit/:id', [adminAuthMiddleware], additionalQualification.edit);
router.get('/additional-qualifications/delete/:id', [adminAuthMiddleware], additionalQualification.delete);

router.get('/oaci-types', [adminAuthMiddleware], oaciType.index);
router.all('/oaci-types/create', [adminAuthMiddleware, oaciTypeInsertBody], oaciType.create);
router.all('/oaci-types/edit/:id', [adminAuthMiddleware, oaciTypeInsertBody], oaciType.edit);
router.get('/oaci-types/delete/:id', [adminAuthMiddleware], oaciType.delete);

router.get('/amenity-types', [adminAuthMiddleware], amenityType.index);
router.all('/amenity-types/create', [adminAuthMiddleware], amenityType.create);
router.all('/amenity-types/edit/:id', [adminAuthMiddleware], amenityType.edit);
router.get('/amenity-types/delete/:id', [adminAuthMiddleware], amenityType.delete);

module.exports = router;