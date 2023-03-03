let mysql = require('mysql2');

let config = {
    host : 'localhost',    
    port: '3306',
    user: 'root',
    password: 'mysql2003s@',
    database: 'tasksdb',
    multipleStatements: true
    
}

let connection = mysql.createConnection(config);

module.exports = connection;