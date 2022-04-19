// Connects mysql to application
const mysql = require('mysql2');


// PLEASE USE YOUR OWN PASSWORD FOR SECURITY REASONS
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee tracker database.')
);

module.exports = db;