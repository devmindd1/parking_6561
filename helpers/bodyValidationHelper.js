const {validationResult} = require('express-validator');

exports.validate = async function(req, $bodies = []){
    for (let body of $bodies)
        for (let field of body)
            await field.run(req);

    return validationResult(req);
};