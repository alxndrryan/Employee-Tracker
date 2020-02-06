INSERT INTO department (name)
VALUES ("Sales"), ("Accounting"), ("Shipping"), ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 82000, 1), ("Junior Salesperson", 4000, 1), ("Account Director", 110000, 2), ("Senior Accountant", 85000, 2), ("Head of Shipping", 75000, 3), ("Head of Receiving", 75000, 3), ("HR Manager", 120000, 4), ("Benefits Manager", 115000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alexander", "Hogle", 2, 2), ("Ronald", "Pfiester", 1, NULL), ("Cameron", "Gideon", 2, 2), ("Cameron", "Johnston", 3, NULL), ("Timothy", "Greenlee", 4, 4), ("Jake", "Smith", 5, NULL), ("Julia", "Robinson", 6, NULL), ("Hillary", "Jefferson", 7, NULL), ("Ashley", "Washington", 8, 8);
