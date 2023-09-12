const UserModel = require('../models/UserModel.js');

module.exports = async function (req, res, next){
    // const userModel = new UserModel();

    try {
        // const _token = req.cookies['adminUToken'];
        //
        // console.log(_token);
        //
        // if(!_token)
        //     return res.redirect('login');
        //
        // const userData = await userModel.getUserByToken(_token);
        //
        // console.log(userData);
        // if(!userData)
        //     return res.redirect('login');

        req.user = {
            id: 1
        };
        next();
    }catch (e) {
        return res.redirect('login');
    }
};