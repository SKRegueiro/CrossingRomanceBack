const mysql = require('mysql');
var connection;
// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
//     connection.connect();
// } else {
connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'crossing_app'
})
// }

global.db = connection;