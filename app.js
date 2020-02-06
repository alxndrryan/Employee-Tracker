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