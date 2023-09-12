const crypto = require('crypto');

exports.string2sha1 = function(string){
    return crypto.createHash('sha1').update(string).digest('hex');
};

exports.randomString = function(bytes = 20){
    return crypto.randomBytes(bytes).toString('hex');
};

exports.titleFromUrl = function(url){
    return url.replace(/^https?:\/\//, '').replaceAll('/', ' ').replaceAll('-', ' ').replaceAll('_', ' ');
};