const router = new (require('express').Router)();
// const authMiddleware = require('../middlewares/authMiddleware');
const {signUpBody} = require('../models/bodyValidation/userBody');
// const {postInsertBody} = require('../models/bodyValidation/postBody');
// const {postLikeUpdateBody} = require('../models/bodyValidation/postsLikeBody');
// const {usersFollowUpdateBody} = require('../models/bodyValidation/usersFollowBody');
// const {negotiationInsertBody} = require('../models/bodyValidation/negotiationBody');
// const {
//     negotiationUserInsertBody,
//     negotiationUserUpdateBody,
//     negotiationUserJoinBody
// } = require('../models/bodyValidation/negotiationUserBody');

const auth = require('../controllers/api/v1/authController');
const source = require('../controllers/api/v1/sourceController');
// const user = require('../controllers/api/v1/userController');
// const index = require('../controllers/api/v1/indexController');
// const question = require('../controllers/api/v1/questionController');
// const post = require('../controllers/api/v1/postController');
// const postsLike = require('../controllers/api/v1/postsLikeController');
// const usersFollow = require('../controllers/api/v1/usersFollowController');
// const search = require('../controllers/api/v1/searchController');
const country = require('../controllers/api/v1/countryController');
// const scenario = require('../controllers/api/v1/scenarioController');
// const negotiation = require('../controllers/api/v1/negotiationController');
// const scenarioRole = require('../controllers/api/v1/scenarioRoleController');
// const negotiationUser = require('../controllers/api/v1/negotiationUserController');

///////////////////////////////////////////////////////////////////////////////////////////
// router.post('/login', [loginBody], auth.login);
router.post('/sign-up', [signUpBody], auth.signUp);
// router.put('/auth-refresh', auth.refresh);

// router.get('/test', [authMiddleware], index.test);
// router.put('/logout', [authMiddleware], auth.logout);
// router.get('/connect', [authMiddleware], auth.connect);

// router.post('/posts', [authMiddleware, postInsertBody], post.insert);
// router.get('/posts/:postId', [authMiddleware, postInsertBody], post.getById);


// router.get('/home', [authMiddleware], index.home);

// router.get('/search', [authMiddleware], search.search);

// router.get('/users/profile', [authMiddleware], user.profile);




// router.post('/test', index.test);
// router.get('/test1', index.test);
router.get('/countries', country.list);
router.get('/auth-sources', source.authSource);
router.get('/sources/aircraft-info-filtered/:keyword', source.aircraftInfoFiltered);

//todo authmidlware to all('*'); without login sign in

// router.get('/connect', [authMiddleware], auth.connect);
// router.post('/logout', [authMiddleware], auth.logout);

// router.put('/users/reset-password', [authMiddleware, resetPasswordBody], user.resetPassword);
// router.put('/users/update-info', [authMiddleware, updateBody], user.update);


module.exports = router;