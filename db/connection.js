const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'M0unt41nD3w!',
        database: 'election'
    },
    console.log('Connected to the employee tracker database.')
);





module.exports = db;