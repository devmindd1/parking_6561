const AirfieldsSpacesBookingModel = require('../models/AirfieldsSpacesBookingModel.js');

exports.index = async function(req, res){
    const airfieldsSpacesBookingModel = new AirfieldsSpacesBookingModel();

    res.data.items = await airfieldsSpacesBookingModel.getOwnerCustomers(req.user.id);

    return res.render('customers/index', res.data);
};

exports.edit = async function(req, res){
    res.render("admin/home/edit",  {user: req.user});
};

exports.update = async function(req, res){
    let userModel = new UserModel();
    let errors = validationResult(req);

    if(!errors.errors.length){
        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };

        if(req.body.password)
            userData.password = string2sha1(req.body.password);

        await userModel.updateById(req.user.id, userData);

        res.redirect("/admin");
    }

    res.render("admin/home/edit",  {user: req.user, errorsArray: errors.array()});
};