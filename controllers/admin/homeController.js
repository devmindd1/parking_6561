exports.index = function(req, res){
    return res.render('admin/home/index', res.data);
};

exports.edit = async function(req, res){
    res.data.user = req.user;

    return res.render("admin/home/edit", res.data);
};
