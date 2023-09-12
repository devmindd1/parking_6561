const PostModel = require('../../../models/PostModel');
const PostsSourceModel = require('../../../models/PostsSourceModel');

exports.home = async function(req, res){
    const postModel = new PostModel();
    const postsSourceModel = new PostsSourceModel();

    res.data.posts = await postModel.getForHome(req.user.id);

    res.data.postsSources = await postsSourceModel.getByPostIdsIndexed(
        res.data.posts.map(p => p.id)
    );

    return res.status(200).json(res.data);
};

exports.test = async function(req, res, next){
    // const scenarioModel = new ScenarioModel();

    // res.data.scenarios = await scenarioModel.getAll();

    return res.status(200).json(res.data);
};


