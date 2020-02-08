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

//Add departments, roles, employees

//View departments, roles, employees

async function viewRoles() {
    await db.query('', (err, res) => {
        if (err) throw err;
        console.log(' ');
        console.table(res);

    })
};

async function viewRoleSummary() {
    console.log(' ');
    await db.query('SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        
    })
};

//View departments

async function viewDepartments() {
    
    await db.query('SELECT id, name AS department FROM department', (err, res) => {
        if (err) throw err;
        console.log(' ');
        console.table(res);
        
    })
};

//Update employee roles

//BONUS
//Update employee managers
//View employees by managers
//Delete departments, roles, and employees
//View total utilized budget of a department --ie the combined salaries of all employees in that department

function init() {
    viewDepartments();
    viewRoleSummary();
}


//Start application
init();