const {validationResult} = require('express-validator');
const UserModel = require('../../../models/UserModel');

exports.update = async function(req, res){
    const userModel = new UserModel();
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    await userModel.update(req.user.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        country_id: req.body.country_id,
        date_of_birth: req.body.date_of_birth
    });

    return res.status(200).json(res.data);
};


// exports.profile = async function(req, res){
//     const postModel = new PostModel();
//     const postsSourceModel = new PostsSourceModel();
//     const usersFollowersModel = new UsersFollowersModel();
//
//     res.data.followersCount = await usersFollowersModel.getFollowersCount(req.user.id);
//     res.data.followingsCount = await usersFollowersModel.getFollowingsCount(req.user.id);
//     res.data.posts = await postModel.getPostsByUserId(req.user.id);
//     res.data.postsCount = res.data.posts.length;
//     res.data.postsSources = await postsSourceModel.getByPostIdsIndexed(
//         res.data.posts.map(p => p.id)
//     );
//
//     return res.status(200).json(res.response);
// };