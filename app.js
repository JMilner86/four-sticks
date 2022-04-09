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
        ]).then(
            function(result) {
                
            })
    }
};

init();