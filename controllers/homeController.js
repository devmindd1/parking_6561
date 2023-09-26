const OaciTypeModel = require('../models/OaciTypeModel');
const xlsx = require('node-xlsx');
exports.index = async function(req, res){
    return res.render('home/index', res.data);
};

exports.test = async function(req, res){
    const oaciTypeModel = new OaciTypeModel();



    const [workSheetsFromFile] = xlsx.parse(`${__dirname}/test1.xlsx`);
    //
    //
    // console.log(workSheetsFromFile.data);


    for(let i = 1; i < workSheetsFromFile.data.length; i++){
        if(!workSheetsFromFile.data[i][0]) continue;

        await oaciTypeModel.insert({
            oaci_code: workSheetsFromFile.data[i][0],
            airfield_name: workSheetsFromFile.data[i][1],
            city: workSheetsFromFile.data[i][2],
            runways_count: workSheetsFromFile.data[i][5],
            type: workSheetsFromFile.data[i][6],
        });
    }




    return res.render('home/test', res.data);
};