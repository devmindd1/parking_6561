const UserModel = require('../../models/UserModel.js');
const AirfieldModel = require('../../models/AirfieldModel.js');

exports.index = async function(req, res){
    const userModel = new UserModel();

    res.data.items = await userModel.getAllOwners();
    res.data.statuses = AirfieldModel._STATUSES;

    return res.render('admin/owners/index', res.data);
};
