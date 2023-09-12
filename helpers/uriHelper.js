exports.getAbsolute = function(uri){
    let urlTmp = uri.split('#');
    return urlTmp[0].trim();
};

exports.createNameFromUri = function(uri){
    let vTmp = uri.split('?');
    vTmp = vTmp[0].trim()
        .replace(/"/g, '_')
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/  +/g, '-')
        .replace(/(https:\/\/|http:\/\/)/g, '');

    return vTmp;
};