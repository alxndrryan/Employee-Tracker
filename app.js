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
        init();
    })
};

//View roles
async function viewRoles() {
    console.log(' ');
    await db.query('SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

//view employees
async function viewEmployees() {
    console.log(' ');
    await db.query('SELECT e.id, e.first_name AS First_Name, e.last_name AS Last_Name, title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
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
        init();
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
        init();
    })
}

//Add employee

async function addEmployee() {
    let positions = await db.query('SELECT id, title FROM role');
    let managers = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS Manager FROM employee WHERE manager_id IS Null');
    managers.unshift({ id: null, Manager: "None" });

    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee's first name:"
            // validate: confirmStringInput
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee's last name:"
            // validate: confirmStringInput
        },
        {
            name: "role",
            type: "list",
            message: "Choose employee role:",
            choices: positions.map(obj => obj.title)
        },
        {
            name: "manager",
            type: "list",
            message: "Choose the employee's manager:",
            choices: managers.map(obj => obj.Manager)
        }
    ]).then(answers => {
        let roleDetails = positions.find(obj => obj.title === answers.role);
        let manager = managers.find(obj => obj.Manager === answers.manager);
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)", [[answers.firstName.trim(), answers.lastName.trim(), roleDetails.id, manager.id]]);
        console.log(`${answers.firstName} ${answers.lastName} was added to the employee database.`);
        init();
    });
};

//Update employees roles and employee manager

async function updateEmployeeRole() {
    let employees = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
    employees.push({ id: null, name: "Cancel" });
    let roles = await db.query('SELECT id, title FROM role');
    let managers = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS Manager FROM employee WHERE manager_id IS Null');
    managers.unshift({ id: null, Manager: "None" });

    inquirer.prompt([
        {
            name: "empName",
            type: "list",
            message: "Change role for which employee?",
            choices: employees.map(obj => obj.name)
        },
        {
            name: "newRole",
            type: "list",
            message: "Change their role to:",
            choices: roles.map(obj => obj.title)
        },
        {
            name: "manager",
            type: "list",
            message: "Choose the employee's manager:",
            choices: managers.map(obj => obj.Manager)
        }
    ]).then(answers => {
        if (answers.empName != "Cancel") {
            let empID = employees.find(obj => obj.name === answers.empName).id
            let roleID = roles.find(obj => obj.title === answers.newRole).id
            let manager = managers.find(obj => obj.Manager === answers.manager);
            db.query("UPDATE employee SET role_id=?, manager_id=? WHERE id=?", [roleID, manager.id, empID]);
            console.log(`${answers.empName} new role is ${answers.newRole}`);
        }
        init();
    })
};

//BONUS
//Update employee managers (executed in updateEmployeeRole function)
//View employees by managers
//Delete departments, roles, and employees
//View total utilized budget of a department --ie the combined salaries of all employees in that department

//Menu to add employee and update employee's role

function employeeMenu() {
    inquirer.prompt({
        name: "empmenu",
        type: "list",
        message: "Choose an option:",
        choices: [
            "Add New Employee",
            "Edit Employee Role",
            "Return To Main Menu"
        ]
    }).then(res => {
        switch (res.empmenu) {
            case "Add New Employee":
                addEmployee();
                break;
            case "Edit Employee Role":
                updateEmployeeRole();
                break;
            case "Return To Main Menu":
                init();
                break;
        }
    })
}

//Runs application

function init() {
    inquirer.prompt({
        name: "mainmenu",
        type: "list",
        message: "Choose an option. Press 'control + c' at anytime to quit.",
        choices: [
            "View Employees",
            "Edit Employee Info",
            "View Roles",
            "Add Roles",
            "View Departments",
            "Add Departments"
        ]
    }).then(res => {
        switch (res.mainmenu) {
            case "View Employees":
                viewEmployees();
                break;
            case "Edit Employee Info":
                employeeMenu();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "Add Roles":
                addRole();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "Add Departments":
                addDepartment();
                break;
        }
    })
}


//Start application
init();