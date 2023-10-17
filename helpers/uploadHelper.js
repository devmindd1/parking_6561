const {randomString} = require('./stringHelper');
const {defaultStaticPath} = require('../config/defaults');

exports.upload = async function(file, path){
    if(!file) return '';

    const [,ext] = file.name.split('.');
    const fileName = randomString() + `.${ext}`;
    const fullPath = path + fileName;

    try {
        await file.mv(defaultStaticPath +  fullPath);
    }catch (e) {
        return '';
    }

    return fullPath;
};