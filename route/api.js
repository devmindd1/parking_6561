const router = new (require('express').Router)();
const apiAuthMiddleware = require('../middlewares/apiAuthMiddleware');
const recoverPasswordMiddleware = require('../middlewares/recoverPasswordMiddleware');
const {signUpBody, loginBody, forgotPasswordBody, recoverPasswordBody, updateBody} = require('../models/bodyValidation/userBody');
const {getByIdBody, getFiltered, bookBody} = require('../models/bodyValidation/airfieldBody');
const {insertCardBody} = require('../models/bodyValidation/usersCardBody');


const auth = require('../controllers/api/v1/authController');
const source = require('../controllers/api/v1/sourceController');
const airfield = require('../controllers/api/v1/airfieldController');
const country = require('../controllers/api/v1/countryController');
const user = require('../controllers/api/v1/userController');

///////////////////////////////////////////////////////////////////////////////////////////
router.put('/auth-refresh', auth.refresh);
router.post('/login', [loginBody], auth.login);
router.post('/sign-up', [signUpBody], auth.signUp);


router.get('/countries', country.list);
router.get('/auth-sources', source.authSource);
router.get('/sources/aircraft-info-filtered/:keyword', source.aircraftInfoFiltered);


router.post('/forgot-password', [forgotPasswordBody], auth.forgotPassword);
router.get('/recover-password-validate/:forgotPasswordToken', [recoverPasswordMiddleware], auth.recoverPasswordValidate);
router.post('/recover-password/:forgotPasswordToken', [recoverPasswordMiddleware, recoverPasswordBody], auth.recoverPassword);


//todo authmidlware to all('*'); without login sign in

router.put('/users', [apiAuthMiddleware, updateBody], user.update);
router.post('/users/delete-card', [apiAuthMiddleware], user.deleteCard);
router.get('/users/get-cards', [apiAuthMiddleware], user.getCards);
router.post('/users/insert-card', [apiAuthMiddleware, insertCardBody], user.insertCard);
router.put('/users/change-default-card', [apiAuthMiddleware], user.changeDefaultCard);
router.get('/airfields/free-by-range', [apiAuthMiddleware, getFiltered], airfield.freeAirfieldsByRange);
// router.get('/airfields/:airfieldId', [apiAuthMiddleware, getByIdBody], airfield.getById);
router.get('/airfields/:oaciId', [apiAuthMiddleware, getByIdBody], airfield.getByOaciId);
router.post('/airfields/book', [apiAuthMiddleware, bookBody], airfield.book);
router.post('/airfields/calc-book-price', [apiAuthMiddleware, bookBody], airfield.calcBookPrice);
router.put('/logout', [apiAuthMiddleware], auth.logout);
// router.post('/logout', [authMiddleware], auth.logout);

// Arthur check this route
router.post('/users/get-bookings', [apiAuthMiddleware], user.getBookings);

module.exports = router;