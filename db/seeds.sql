INSERT INTO departments (title)
VALUES 
('Singers'),
('Guitarists'),
('Drummers'),
('Bassists');

INSERT INTO roles (title, salary, department_id)
VALUES
('Singer', 345356, 1), 
('Guitarist', 356435, 2),
('Drummer', 300000, 3),
('Bassist', 324876, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Robert', 'Plant', 1, null), 
('Jimmy', 'Page', 2, null),
('John', 'Bonham', 3, null),
('John Paul', 'Jones', 4, null);