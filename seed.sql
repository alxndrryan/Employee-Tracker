INSERT INTO department (name)
VALUES ("Sales"), ("Accounting"), ("Shipping"), ("Human Resources");

INSERT INTO role (title, salary)
VALUES ("Sales Manager", 10000, 1), ("Junior Salesperson", 4000, 1), ("Account Director", 110000, 2), ("Senior Accountant", 85000, 2), ("Head of Shipping", 75000, 3), ("Head of Receiving", 75000, 3), ("HR Manager", 120000, 4), ("Benefits Manager", 115000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alexander", "Hogle", 2, NULL), ("Ronald", "Pfiester", 1, NULL), ("Cameron", "Gideon", 4, NULL), ("Cameron", "Johnston", 3, NULL), ("Timothy", "Greenlee", 1, NULL);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
