const {randomString} = require('./stringHelper');

exports.upload = async function(file, path){
    const [,ext] = file.mimetype.split('/');
    const fileName = randomString() + `.${ext}`;
    const fullPath = path + fileName;

    try {
        await file.mv(fullPath);
    }catch (e) {
        return '';
    }

    return fullPath;
};