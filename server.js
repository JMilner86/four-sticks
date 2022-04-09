const inquirer = require('inquirer');
const express = require('express');
const db = require('./db/connection');
const { listenerCount } = require('process');
const server = express();
const table = require('console.table');


server.use(express.urlencoded({ extended: false}));
server.use(express.json());



const init = () => {
    const options = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                choices: [
                    'View all departments',
                    'View all roles', 
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role' 
                ]
            }
        ]).then(function(result) {
            switch (result.options) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateRole();
                    break
            }
        })
    }
    options();
};


const viewDepartments = () => {
    db.query(`SELECT * FROM departments`, (req, res) => {
        console.table(res);
    })
};

const viewEmployees = () => {
    db.query(`SELECT * FROM employees`, (req, res) => {
        console.table(res)
    })
};

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (req, res) => {
        console.table(res)
    })
};

const addDepartment = () => {
        inquirer.prompt({
        type: 'input',
        message: 'Please add department name'
    })
    .then(function (result) {
        db.query(`INSERT INTO  departments ?`, result, (req, res) => {
            console.table(res)
        })
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter employee first name'
        },
        {
            type: 'input',
            message:'Please enter employee last name'
        },
        {
            type: 'input',
            message:'Please enter employee role'
        },
        {
            type: 'input',
            message: 'Please enter employee manager ID'
        }
    ])
    .then(function (result) {
        db.query(`INSERT INTO  employees ?`, result, (req, res) => {
            console.table(res)
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please add role'
        },
        {
            input: 'input',
            message: 'Please input the salary for this role'
        },
        {
            type: 'input',
            message: 'Please enter Department ID for role'
        }
            
    ])
    .then(function (result) {
        db.query(`INSERT INTO  roles ?`, result, (req, res) => {
            console.table(res)
        })
    })
};

const updateRole = () => {
    inquirer.prompt({
        type: 'choices',
        message: 'Please update employee role'
    })
};


init();