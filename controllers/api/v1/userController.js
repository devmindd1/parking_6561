const PostsSourceModel = require('../../../models/PostsSourceModel');
const UsersFollowersModel = require('../../../models/UsersFollowModel');
const PostModel = require('../../../models/PostModel');

exports.resetPassword = async function(req, res){


    return res.status(200).json(res.data);
};

exports.update = async function(req, res){


    return res.status(200).json(res.data);
};


exports.profile = async function(req, res){
    const postModel = new PostModel();
    const postsSourceModel = new PostsSourceModel();
    const usersFollowersModel = new UsersFollowersModel();

    res.data.followersCount = await usersFollowersModel.getFollowersCount(req.user.id);
    res.data.followingsCount = await usersFollowersModel.getFollowingsCount(req.user.id);
    res.data.posts = await postModel.getPostsByUserId(req.user.id);
    res.data.postsCount = res.data.posts.length;
    res.data.postsSources = await postsSourceModel.getByPostIdsIndexed(
        res.data.posts.map(p => p.id)
    );

    return res.status(200).json(res.response);
};