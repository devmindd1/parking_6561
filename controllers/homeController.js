exports.index = async function(req, res){
    return res.render('home/index', res.data);
};