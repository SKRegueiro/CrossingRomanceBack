const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'crossing_app'
})

global.db = pool;