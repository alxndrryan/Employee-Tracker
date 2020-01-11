DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)
);


INSERT INTO department (name)
VALUES ("Sales"), ("Financial"), ("Shipping"), ("Personal Relations");

INSERT INTO role (title, salary)
VALUES ("Manager", 10000), ("Intern", 1000), ("Junior Employee", 6000), ("Senior Employee", 8000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alexander", "Hogle", 2, NULL), ("Ronald", "Pfiester", 1, NULL), ("Cameron", "Gideon", 4, NULL), ("Cameron", "Johnston", 3, NULL), ("Timothy", "Greenlee", 1, NULL);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
