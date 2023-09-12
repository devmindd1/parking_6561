const router = new (require('express').Router)();
// const authMiddleware = require('../middlewares/authMiddleware');
// const {signUpBody, loginBody, resetPasswordBody, updateBody} = require('../models/bodyValidation/userBody');
// const {postInsertBody} = require('../models/bodyValidation/postBody');
// const {postLikeUpdateBody} = require('../models/bodyValidation/postsLikeBody');
// const {usersFollowUpdateBody} = require('../models/bodyValidation/usersFollowBody');
// // const {negotiationInsertBody} = require('../models/bodyValidation/negotiationBody');
// // const {
// //     negotiationUserInsertBody,
// //     negotiationUserUpdateBody,
// //     negotiationUserJoinBody
// // } = require('../models/bodyValidation/negotiationUserBody');
//
// const auth = require('../controllers/api/v1/authController');
// const user = require('../controllers/api/v1/userController');
// const index = require('../controllers/api/v1/indexController');
// const question = require('../controllers/api/v1/questionController');
// const post = require('../controllers/api/v1/postController');
// const postsLike = require('../controllers/api/v1/postsLikeController');
// const usersFollow = require('../controllers/api/v1/usersFollowController');
// const search = require('../controllers/api/v1/searchController');
// // const country = require('../controllers/api/v1/countryController');
// // const scenario = require('../controllers/api/v1/scenarioController');
// // const negotiation = require('../controllers/api/v1/negotiationController');
// // const scenarioRole = require('../controllers/api/v1/scenarioRoleController');
// // const negotiationUser = require('../controllers/api/v1/negotiationUserController');
//
// ///////////////////////////////////////////////////////////////////////////////////////////
// router.post('/login', [loginBody], auth.login);
// router.post('/sign-up', [signUpBody], auth.signUp);
// router.put('/auth-refresh', auth.refresh);
//
// router.get('/test', [authMiddleware], index.test);
// router.put('/logout', [authMiddleware], auth.logout);
// router.get('/connect', [authMiddleware], auth.connect);
// router.get('/get-questions/:typeId', [authMiddleware], question.getQuestionsByTypeId);
//
// router.post('/posts', [authMiddleware, postInsertBody], post.insert);
// router.get('/posts/:postId', [authMiddleware, postInsertBody], post.getById);
//
// router.put('/posts-like', [authMiddleware, postLikeUpdateBody], postsLike.like);
//
// router.put('/users-follow', [authMiddleware, usersFollowUpdateBody], usersFollow.follow);
//
// router.get('/home', [authMiddleware], index.home);
//
// router.get('/search', [authMiddleware], search.search);
//
// router.get('/users/profile', [authMiddleware], user.profile);
//



// router.post('/test', index.test);
// router.get('/test1', index.test);
// router.get('/countries', country.list);
//
//todo authmidlware to all('*'); without login sign in
// router.get('/connect', [authMiddleware], auth.connect);
// router.post('/logout', [authMiddleware], auth.logout);
//
// router.put('/users/reset-password', [authMiddleware, resetPasswordBody], user.resetPassword);
// router.put('/users/update-info', [authMiddleware, updateBody], user.update);
//
// router.get('/scenarios/list', [authMiddleware], scenario.getList);
// router.get('/scenarios/:scenarioId', [authMiddleware], scenario.getById);
//
// router.get('/scenario-roles', [authMiddleware], scenarioRole.getById);
//
// router.post('/negotiations/create', [authMiddleware, negotiationInsertBody, negotiationUserInsertBody], negotiation.insert);
// router.post('/negotiations/join', [authMiddleware, negotiationUserJoinBody], negotiation.join);
// router.get('/negotiations/for-join/:negotiationId', [authMiddleware], negotiation.getForJoin);
// router.get('/negotiations/available', [authMiddleware], negotiation.getAvailable);
//
// router.put('/negotiation-users', [authMiddleware, negotiationUserUpdateBody], negotiationUser.update);
// router.get('/negotiation-users/pass-roles', [authMiddleware], negotiationUser.getPassRoles);
// router.get('/negotiation-users/pass-roles/:scenarioRoleId', [authMiddleware], negotiationUser.getPassRole);

module.exports = router;