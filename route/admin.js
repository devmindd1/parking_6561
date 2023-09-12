const router = new (require('express').Router);

const auth = require('../controllers/admin/authController.js');
const home = require('../controllers/admin/homeController.js');
const owner = require('../controllers/admin/ownerController.js');
const airfield = require('../controllers/admin/airfieldController.js');

const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware.js');

const {adminLoginBody} = require('../models/bodyValidation/userBody.js');


router.get('/login', auth.index);
router.post('/login', [adminLoginBody], auth.login);

router.get('/', [adminAuthMiddleware], home.index);
router.get('/admin', [adminAuthMiddleware], home.index);
router.get('/edit', [adminAuthMiddleware], home.edit);
router.post('/update', [adminAuthMiddleware], home.update);



router.get('/owners', [adminAuthMiddleware], owner.index);
router.get('/airfields', [adminAuthMiddleware], airfield.index);



router.get('/airfields/edit/:id', [adminAuthMiddleware], airfield.edit);
router.post('/airfields/update/:id', [adminAuthMiddleware], airfield.update);


module.exports = router;