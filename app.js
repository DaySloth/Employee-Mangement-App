const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];


/* Uses inquirer to gather information about the development team members,
and to create objects for each team member */
function getUserData(){

    return inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Person's Name?"
    },
    {
        type: "input",
        name: "email",
        message: "Person's Email?"
    },
    {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: ["Intern", "Manager", "Engineer"]
    }
])};

function init(){
    getUserData().then(function(res){
        res.id = uuidv4();
        if(res.role === "Intern"){
            function ask(){
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "Where do they attend school?"
                    },
                    {
                        type: "list",
                        name: "add",
                        message: "Would you like to add another Team Member?",
                        choices: ["Yes", "No"]
                    }
                ]);
            };

            ask().then(function(input){
                res.school = input.school;
                let intern = new Intern(res.name, res.id, res.email, res.school);
                teamArray.push(intern);
                if(input.add === "Yes"){
                    console.log("************** Add another team member **************");
                    init();
                }else{
                    buildHTML();
                };
            });
        }else if(res.role === "Manager"){
            function ask(){
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "num",
                        message: "What is their office number?"
                    },
                    {
                        type: "list",
                        name: "add",
                        message: "Would you like to add another Team Member?",
                        choices: ["Yes", "No"]
                    }
                ])
            };

            ask().then(function(input){
                res.officeNumber = input.num;
                let manager = new Manager(res.name, res.id, res.email, res.officeNumber);
                teamArray.push(manager);
                if(input.add === "Yes"){
                    console.log("************** Add another team member **************");
                    init();
                }else{
                    buildHTML();
                }
            });
        }else{
            function ask(){
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "gitHub",
                        message: "What is their GitHub?"
                    },
                    {
                        type: "list",
                        name: "add",
                        message: "Would you like to add another Team Member?",
                        choices: ["Yes", "No"]
                    }
                ])
            };

            ask().then(function(input){
                res.gitHub = input.gitHub;
                let engineer = new Engineer(res.name, res.id, res.email, res.gitHub);
                teamArray.push(engineer);
                if(input.add === "Yes"){
                    console.log("************** Add another team member **************");
                    init();
                }else{
                    buildHTML();
                }
            });
        };
    });
};
