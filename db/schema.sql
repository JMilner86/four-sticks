-- Creates DB and uses DB 
DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;
-- Drops Tables if they already exist
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;

-- Creates new table for deparmtments 
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL
);

-- Creates new table for roles
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INTEGER,
    salary DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Creates new table for employees
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    salary_id INTEGER,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role_id FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE SET NULL
);