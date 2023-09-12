const fs = require('fs');
const fsExtra = require('fs-extra');

exports.deleteSync = (dir) => {
    fs.rmSync(dir, { recursive: true, force: true });
};

exports.createFileSync = async function(fileName, filePath){
    if(!fs.existsSync(filePath + '/' + fileName)){
        await fs.mkdirSync(filePath, { recursive: true });
        await fs.appendFileSync(filePath + '/' + fileName, '');
    }

    return true;
};

exports.rmInFolder = async (dir) => {
    if(!fs.existsSync(dir))
        return true;

    const files = fs.readdirSync(dir);
    if(!files.length)
        return true;

    for (const file of files) {
        await exports.deleteSync(dir + '/' + file)
    }

    return true;
};

exports.fileContent = async (filePath) => {
    return await fs.readFileSync(filePath, 'utf8');
};

exports.moveFolder = function(pathFrom, pathTo){
    return new Promise(resolve => {
        fsExtra.move(pathFrom, pathTo, err => {
            if(err) return console.error(err);
            resolve(true);
        });
    });
};

exports.createFolder = function(path){
    return fs.mkdirSync(path);
};