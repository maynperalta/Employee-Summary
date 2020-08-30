const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];


const managerQuestions = [
    {
        message: "What is the manager's name?",
        type: "input",
        name: "name",
        validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Please enter a valid first or last name!";
            }
            return true;
        }
    },
    {
        message: "What is the manager's email address?",
        type: "input",
        name: "email",
        validate: async (input) => {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,3})+$/.test(input)){
                return true;
            }
            return "Please enter a valid email address!";
        }
    },
    {
        message: "What is the manager's office phone number?",
        type: "input",
        name: "officeNumber",
        validate: async (input) => {
            if (isNaN(input)) {
                return "Please enter a valid phone number!";
            }
            return true;
        }
    },
    {
        message: "Does this manager have team members?",
        type: "list",
        name: "Team",
        choices: ["Yes", "No"]
    }
]

const employeeQuestions = [
    {
        message: "Please enter the employee's name.",
        type: "input",
        name: "name",
        validate: async (input) => {
            if (input == "") {
                return "Please enter a valid first or last name!";
            }
            return true;
        }
    },
    {
        message: "Please enter the employee's email address.",
        type: "input",
        name: "name",
        validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address!";
        }
    },
    {
        message: "What is this employee's role?",
        type: "list",
        name: "role",
        choices: ["Engineer", "Intern"]
    },
    {
        when: input => {
            return input.role == "Engineer"
        },
        message: "Please enter the engineer's GitHub username.",
        type: "input",
        name: "github",
        validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Please enter a valid GitHub username!";
            }
            return true;
        }
    },
    {
        when: input => {
            return input.role == "Intern"
        },
        message: "What school did the intern attend?",
        type: "input",
        name: "school",
        validate: async (input) => {
            if (input == "") {
                return "Please enter a valid school name!";
            }
            return true;
        }
    },
    {
        message: "Would you like to add another team member?",
        type: "list",
        name: "addEmployee",
        choices: ["Yes", "No"]
    }
]


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
