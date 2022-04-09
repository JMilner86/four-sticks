const inquirer = require('inquirer');
const express = require('express');
const PORT = process.env.PORT || 3001;
const db = require('./db/connection');
const { listenerCount } = require('process');
const app = express();



const init = () => {
    const options = () => {
        inquirer.prompt([
            {
                type: list,
                name: 'action',
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
};


const viewDepartments = () => {

};

const viewEmployees = () => {

};

const viewRoles = () => {

};

const addDepartment = () => {

};

const addEmployee = () => {

};

const addRole = () => {

};

const updateRole = () => {

};


init();