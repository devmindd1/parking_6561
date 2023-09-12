const UserModel = require('../models/UserModel');

module.exports = async function (req, res, next){
    const userModel = new UserModel();

    try {
        const _token = req.cookies['UToken'];
        if(!_token)
            return res.redirect('login');

        const userData = await userModel.getUserByToken(_token);
        if(!userData)
            return res.redirect('login');

        req.user = userData;
        next();
    }catch (e) {
        return res.redirect('login');
    }
};