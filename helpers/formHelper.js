exports.objectFromPrefix = function(arrayInputName, body){
    body[arrayInputName] = {};

    for(const key of Object.keys(body)){


        console.log(key)

        if(key.indexOf(arrayInputName + '[') === 0){
            body[arrayInputName][key.split('[')[1].replace(/.$/, '')] = body[key];
            delete body[key];
        }



    }

    return true;
};