DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;


CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL
);


CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
);


CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    salary_id INTEGER,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_salary FOREIGN KEY(salary_id) REFERENCES roles(salary) ON DELETE SET NULL,
    CONSTRAINT fk_role_id FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE SET NULL,
    CONSTRAINT fk_manager_id FOREIGN KEY(id) REFERENCES roles(title) ON DELETE SET NULL
);