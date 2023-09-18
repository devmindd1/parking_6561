// module.exports = require('knex')({
//     client: 'mysql2',
//     connection: {
//         host : '127.0.0.1',
//         user : 'root',
//         password : '',
//         database : 'parking',
//         multipleStatements: true
//     }
// });

module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host:'65.109.11.93',
        user: 'powerd',
        database: 'parking',
        password: 'Powerd@2023',
        multipleStatements: true
    }
});