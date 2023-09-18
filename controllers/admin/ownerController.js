const {validationResult} = require('express-validator');
const {string2sha1} = require('../../helpers/stringHelper.js');
const UserModel = require('../../models/UserModel.js');
const AirfieldModel = require('../../models/AirfieldModel.js');

exports.index = async function(req, res){
    const userModel = new UserModel();

    return res.render('admin/owners/index', {
        items: await userModel.getAllOwners(),
        statuses: AirfieldModel._STATUSES
    });
};
