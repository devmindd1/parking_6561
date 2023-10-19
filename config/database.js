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

// module.exports = require('knex')({
//     client: 'mysql2',
//     connection: {
//         host:'65.109.11.93',
//         user: 'powerd',
//         database: 'parking',
//         password: 'Powerd@2023',
//         multipleStatements: true
//     }
// });

/////// romain domain
module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: '134.209.113.29',
        user: 'avionest_my_1',
        database: 'parking',
        password: 'test_11##22',
        multipleStatements: true
    }
});