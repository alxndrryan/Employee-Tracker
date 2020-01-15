var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    //Port
    port: 3306,

    // Username
    user: "root",

    //Password
    password: "",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({

        })
        .then(function(answer) {
            switch (answer.action) {
            case
            }
        });
}