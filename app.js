const inquirer = require('inquirer');
const db = require('./db/connection');
const { listenerCount } = require('process');
const table = require('console.table');



const init = () => {
    const options = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                choices:
                [
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
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        init();
    });
};

const viewRoles = () => {
    const sql = `SELECT roles.id, roles.title, roles.salary, roles.department_id, departments.title
    FROM roles
    INNER JOIN departments ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        init();
    });
};

const viewEmployees = () => {
    const sql = `SELECT e.id, e.first_name, e.last_name,
    roles.title, roles.salary,
    concat(m.first_name, ' ', m.last_name) manager
    FROM employees e
    INNER JOIN roles ON e.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees m ON m.id = e.manager_id`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        init();
    });
};

const addDepartment = () => {
        inquirer.prompt([{
        type: 'input',
        name: 'new_department',
        message: 'Please add department name'
    }])
    .then(input => {
        const sql = `INSERT INTO departments(title) VALUES (?)`;
        const params = input.new_department;
        db.query(sql, params, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(`Added ${params} to the database`);
            init();
        });
    });

};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter employee first name',
            name: 'first_name'
        },
        {
            type: 'input',
            message:'Please enter employee last name',
            name: 'last_name'
        },
        {
            type: 'input',
            message:'Please enter employee role',
            name: 'role_id'
        },
        {
            type: 'input',
            message: 'Please enter employee manager ID',
            name: 'manager_id'
        }
    ])
    .then(input => {
        const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const params = [input.first_name, input.last_name, input.role_id, input.manager_id];
        db.query(sql, params, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(`Added ${params} to the database`);
            init();
        });
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please add role',
            name: 'title'
        },
        {
            input: 'input',
            message: 'Please input the salary for this role',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Please enter Department ID for role',
            name: 'department_id'
        }
            
    ])
    .then(input => {
        const sql = `INSERT INTO roles(title, department_id, salary) VALUES (?,?,?)`;
        const params = [input.title, input.department_id, input.salary];
        db.query(sql, params, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(`Added ${params[0]} to the database`);
            init();
        });
    });
};

const updateRole = () => {
    const employees = [];
    db.query(`SELECT employees.id, employees.first_name, employees.last_name FROM employees`, (err, result) => {
        if(err) {
            console.log(err);
            return;
        }

        result.forEach(item => {
            const name = `${item.first_name} ${item.last_name}`;
            employees.push(name);
        });

        inquirer.prompt([
            {
                type: 'list',
                name: 'update',
                message: `Who's role do you want to update?`,
                choices: employees
            },
            {
                type: 'input',
                name: 'new_role',
                message: `What is their new role id?`,
                validate: input => {
                    if(!isNaN(input)) {
                        return true;
                    } else {
                        console.log(' Please enter a number');
                        return false;
                    };
                }
            }
        ]).then(input => {
            const split = input.update.split(' ');
            const sql = `UPDATE employees
                         SET role_id = ${input.new_role}
                         WHERE first_name = '${split[0]}'
                         AND last_name = '${split[1]}'`
            db.query(sql, (err, result) => {
                if(err) {
                    console.log(err);
                }
                console.log(`Updated ${input.update}'s role`);
                init();
            });
        });
    });
};

init();