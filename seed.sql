INSERT INTO department (name)
VALUES ("Sales"), ("Financial"), ("Shipping"), ("Personal Relations");

INSERT INTO role (title, salary)
VALUES ("Manager", 10000), ("Intern", 1000), ("Junior Employee", 6000), ("Senior Employee", 8000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alexander", "Hogle", 2, NULL), ("Ronald", "Pfiester", 1, NULL), ("Cameron", "Gideon", 4, NULL), ("Cameron", "Johnston", 3, NULL), ("Timothy", "Greenlee", 1, NULL);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
