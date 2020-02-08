var Database = require("./db-constructor");
const inquirer = require("inquirer");
const cTable = require("console.table");


const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Wheeloftime2020",
    database: "employee_trackerDB"
});

//VIEW departments, roles, employees

//View departments

async function viewDepartments() {
    
    await db.query('SELECT id, name AS department FROM department', (err, res) => {
        if (err) throw err;
        console.log(' ');
        console.table(res);
        
    })
};

//View roles
async function viewRoles() {
    console.log(' ');
    await db.query('SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        
    })
};

//view employees
async function viewEmployees() {
    console.log(' ');
    await db.query('SELECT e.id, e.first_name AS First_Name, e.last_name AS Last_Name, title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id', (err, res) => {
        if (err) throw err;
        console.table(res);

    });
};

//ADD departments, roles, employees

//add department
async function addDepartment() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "Enter new department:",
            validate: async function confirmStringInput(input) {
                if ((input.trim() != "") && (input.trim().length <= 30)) {
                    return true;
                }
                return "Invalid input. Please limit your input to 30 characters or less."
            }
        }
    ]).then(answer => {
        db.query("INSERT INTO department (name) VALUES (?)", [answer.deptName]);
        console.log(`${answer.deptName} was added to departments.`);
    })
};

//add role
async function addRole() {
    let dept = await db.query('SELECT id, name FROM department');

    inquirer.prompt([
        {
            name: "rName",
            type: "input",
            message: "Enter new role title:",
            validate: async function confirmStringInput(input) {
                if ((input.trim() != "") && (input.trim().length <= 30)) {
                    return true;
                }
                return "Invalid input. Please limit your input to 30 characters or less."
            }
        },
        {
            name: "salNum",
            type: "input",
            message: "Enter role salary:",
            validate: input => {
                if (!isNaN(input)) {
                    return true;
                }
                return "Enter a valid number."
            }
        },
        {
            name: "roleDept",
            type: "list",
            message: "Choose role department:",
            choices: dept.map(obj => obj.name)
        }
    ]).then(answer => {
        let deptID = dept.find(obj => obj.name === answer.roleDept).id
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?)", [[answer.rName, answer.salNum, deptID]]);
        console.log(`${answer.rName} was added to the ${answer.roleDept} department.`);
    })
}

//Add employee
async function addEmployee() {
    let roles = await db.query('SELECT id, title FROM role');
    let managers = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS Manager FROM employee');
    managers.unshift({ id: null, Manager: "None" });

    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee's first name:",
            validate: async function confirmStringInput(input) {
                if ((input.trim() != "") && (input.trim().length <= 30)) {
                    return true;
                }
                return "Invalid input. Please limit your input to 30 characters or less."
            }
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee's last name:",
            validate: async function confirmStringInput(input) {
                if ((input.trim() != "") && (input.trim().length <= 30)) {
                    return true;
                }
                return "Invalid input. Please limit your input to 30 characters or less."
            }
        },
        {
            name: "role",
            type: "list",
            message: "Choose employee role:",
            choices: roles.map(obj => obj.title)
        },
        {
            name: "manager",
            type: "list",
            message: "Choose employee's manager:",
            choices: managers.map(obj => obj.Manager)
        }
    ]).then(answer => {
        let rolesDetails = roles.find(obj => obj.title === answer.role);
        let manager = managers.find(obj => obj.Manager === answer.manager);
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)", [[answer.firstName.trim(), answer.lastName.trim(), rolesDetails.id, manager.id]]);
        console.log(`${answer.firstName} was added to the employee database!`);
    
    });
};

//Update employees and roles

//BONUS
//Update employee managers
//View employees by managers
//Delete departments, roles, and employees
//View total utilized budget of a department --ie the combined salaries of all employees in that department

function init() {
    // viewDepartments();
    // viewRoles();
    addEmployee();
    viewEmployees();
}


//Start application
init();