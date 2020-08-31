const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Empty array to push team members into.

const teamMembers = [];

//Function to create manager employee information along with inquirer prompts.

function createManager() {
    inquirer.prompt([
        {
            message: "Please enter the manager's name.",
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
            message: "Please enter the manager's ID.",
            type: "input",
            name: "id",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter a valid ID!";
                }
                return true;
            }

        },
        {
            message: "Please enter the manager's email address.",
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
            message: "Please enter the manager's office phone number.",
            type: "input",
            name: "officeNumber",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid phone number!";
                }
                return true;
            }
        }
    ]).then(function(answers) {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        teamMembers.push(manager);

        createTeam();
    })
}

//Switch/Case for engineer/intern roles.

function createTeam() {
    inquirer.prompt([
        {
            message: "What team member would you like to create?",
            type: "list",
            name: "role",
            choices: ["Engineer", "Intern", "I'm done."]
        },
    ]).then(function(answers) {
        switch (answers.role) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            case "I'm done.":
                console.log(teamMembers)
                saveUsers();
                default:
                    break;
        }
    });
};

//Function if Engineer is selected in previous inquirer prompt with questions.

function createEngineer() {
    inquirer.prompt([
        {
            message: "Please enter the engineer's name.",
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
            message: "Please enter the engineer's ID.",
            type: "input",
            name: "id",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter a valid ID!";
                }
                return true;
            }

        },
        {
            message: "Please enter the engineer's email address.",
            type: "input",
            name: "email",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address!";
            }
        },
        {
            message: "Please enter the engineer's GitHub username.",
            type: "input",
            name: "github",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter a valid GitHub username!";
                }
                return true;
            }
        }
    ]).then(function(answers){
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        teamMembers.push(engineer);

        createTeam();
    });
};

//Function if Intern is selected instead of Engineer.

function createIntern() {
    inquirer.prompt([
        {
            message: "Please enter the intern's name.",
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
            message: "Please enter the intern's ID.",
            type: "input",
            name: "id",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter a valid ID!";
                }
                return true;
            }
        },
        {
            message: "Please enter the intern's email address.",
            type: "input",
            name: "email",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address!";
            }
        },
        {
            message: "Please enter the school the intern is enrolled in.",
            type: "input",
            name: "school",
            validate: async (input) => {
                if (input == "") {
                    return "Please enter a valid school name!";
                }
                return true;
            }
        }
    ]).then(function(answers) {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
        teamMembers.push(intern);

        createTeam();
    })
}

//Call to fire createManager function upon typing node command.

createManager()

//saveUsers function to write and generate HTML file. 

const saveUsers = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  };