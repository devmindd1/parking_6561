exports.index = async function(req, res){
    return res.render('home/index', res.data);
};

exports.test = async function(req, res){
    return res.render('home/test', res.data);
};