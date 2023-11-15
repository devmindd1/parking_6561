const AirfieldModel = require('../../models/AirfieldModel');
const UserModel = require('../../models/UserModel');

exports.index = async function(req, res){
    const airfieldModel = new AirfieldModel();
    const userModel = new UserModel();

    res.data.airfieldsCount = await airfieldModel.getAllCount();
    res.data.managersCount = await userModel.getOwnersCount();
    res.data.reservationsCount = 42;

    return res.render('admin/home/index', res.data);
};

exports.edit = async function(req, res){
    res.data.user = req.user;

    return res.render("admin/home/edit", res.data);
};
