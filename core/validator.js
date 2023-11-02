const {validationResult} = require('express-validator');

exports.validate = function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.errors =  errors.mapped();
        res.data.model = req.body;

        return false;
    }

    return true;
};