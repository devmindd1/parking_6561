const router = new (require('express').Router);

const authMiddleware = require('../middlewares/authMiddleware');

const auth = require('../controllers/authController.js');
const calendar = require('../controllers/calendarController.js');
const home = require('../controllers/homeController.js');
const customer = require('../controllers/customerController.js');
const airfieldsSpace = require('../controllers/airfieldsSpaceController.js');

const Airfield = require('../controllers/AirfieldController.js');
const Booking = require('../controllers/BookingController.js');

const {insertBody} = require('../models/bodyValidation/airfieldBody');
const {loginBody} = require('../models/bodyValidation/userBody');

router.get('/test', home.test);

router.get('/login', auth.login);
router.post('/login', [loginBody], auth.login);
router.put('/auth-refresh', auth.refresh);

router.get('/logout', [authMiddleware], auth.logout);
router.get('/', [authMiddleware], home.index);

//
// router.get('/airfields', [authMiddleware], airfield.index);
// router.get('/airfields/create', [authMiddleware], airfield.create);
// router.get('/airfields/edit/:airfieldId', [authMiddleware], airfield.edit);
// // router.get('/airfields/bank-attached/:airfieldId', [authMiddleware], airfield.bankAttached);
// router.post('/airfields/create', [authMiddleware, insertBody], airfield.create);
// router.post('/airfields/check-emails', [authMiddleware], airfield.checkEmails);



router.get('/airfields', [authMiddleware], (...args) => new Airfield(...args, 'index'));
router.all('/airfields/create', [authMiddleware, insertBody], (...args) => new Airfield(...args, 'create'));
router.all('/airfields/edit/:id', [authMiddleware, insertBody], (...args) => new Airfield(...args, 'edit'));
router.get('/airfields/delete/:id', [authMiddleware], (...args) => new Airfield(...args, 'delete'));
router.post('/airfields/check-emails', [authMiddleware], (...args) => new Airfield(...args, 'checkEmails'));


//router.post('/airfields/create-stripe-account', [authMiddleware, accountTokenCreateBody], airfield.createStripeAccount);
// router.post('/airfields/create-link-for-attach-bank', [authMiddleware], airfield.createLinkForAttachBankToAirfieldAccount);

router.get('/customers', [authMiddleware], customer.index);
router.get('/calendar', [authMiddleware], calendar.index);
router.post('/calendar/get', [authMiddleware], calendar.get);
router.get('/airfields-space/:airfieldId', [authMiddleware], airfieldsSpace.getByAirfieldId);

router.get('/stripe-account-bank-on-boarding-redirect', home.test1);

router.get('/bookings/:airfieldId', [authMiddleware], (...args) => new Booking(...args, 'index'));
router.get('/bookings/view/:airfieldId/:airfieldsSpacesBookingId', [authMiddleware], (...args) => new Booking(...args, 'view'));
router.post('/bookings/submit/:airfieldsSpacesBookingId', [authMiddleware], (...args) => new Booking(...args, 'submit'));

module.exports = router;