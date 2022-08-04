const inquirer = require('inquirer');
const writeFile = require('../utils/generate-site');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

class Roster {
    constructor() {
        // initialize an empty array to push employees to as they are added to display all in the end
        this.employees = [];
    };

    addNewManager() {
        console.log("Welcome Manager! Let's build you a team roster! First, we'll start with you.");
        // utilizes the argument 'manager' to link the fourth question that is specific to job position
        const inputArray = this.promptUserInput('manager');
        inquirer
            .prompt(inputArray)
            // take the responses and create a manager object using the Manager class constructor
            .then(({name, id, email, officeNumber}) => {
                this.employees.push(new Manager(name, id, email, officeNumber));
                return this.addMemberMenu();
            });
    };

    promptUserInput(jobPosition) {
        const userInput = [
            {
                type: 'text',
                name: 'name',
                message: `What is the ${jobPosition}'s name?`,
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log(`Please enter the ${jobPosition}'s name.`);
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'id',
                message: `What is the ${jobPosition}'s ID?`,
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log(`Please enter the ${jobPosition}'s ID.`)
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'email',
                message: `What is the ${jobPosition}'s email?`,
                validate: emailInput => {
                    if (emailInput) {
                        const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);
                        if (valid) {
                            return true;
                        } else {
                            console.log('Please enter a correct email address.');
                            return false;
                        };
                    } else {
                        console.log(`Please enter the ${jobPosition}'s email.`);
                    }
                }
            }];
        
        // logic to decide the fourth question that is job specific
        switch (jobPosition) {
            case 'manager':
                userInput.push({ 
                    type: 'text', 
                    name: 'officeNumber', 
                    message: "What is manager's office number?",
                    validate: officeInput => {
                        if (officeInput) {
                            return true;
                        } else {
                            console.log(`Please put in the ${jobPosition}'s office number.`);
                        }
                    }
                });
                return userInput
            case 'engineer':
                userInput.push({ 
                    type: 'text',
                    name: 'github',
                    message: "What is the engineer's GitHub username?",
                    validate: githubInput => {
                        if (githubInput) {
                            return true;
                        } else {
                            console.log(`Please put in the ${jobPosition}'s GitHub username.`);
                        }
                    }
                });
                return userInput
            case 'intern':
                userInput.push({ 
                    type: 'text',
                    name: 'school',
                    message: "What is the name of the school the intern attends?",
                    validate: schoolInput => {
                        if (schoolInput) {
                            return true;
                        } else {
                            console.log(`Please enter the school the ${jobPosition} attends.`);
                        }
                    }
                });
                return userInput
        };
    };

    // this function is called after every employee is added to serve as a 'home menu' for the user
    addMemberMenu() {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'menu',
                choices: ['Add an Engineer','Add an Intern','Finish Roster']
            })
            .then(({ menu }) => {
                if (menu === 'Add an Engineer') {
                    return this.addNewEngineer();
                } else if (menu === 'Add an Intern') {
                    return this.addNewIntern();
                } else {
                    // this calls pageTemplate to print the roster to index.html
                    return this.pageTemplate();
                }
            });
    };

    addNewEngineer() {
        const inputArray = this.promptUserInput('engineer');
        inquirer
            .prompt(inputArray)
            .then(({name, id, email, github}) => {
                this.employees.push(new Engineer(name, id, email, github));
                this.addMemberMenu();
            });
    };

    addNewIntern() {
        const inputArray = this.promptUserInput('intern');
        inquirer
            .prompt(inputArray)
            .then(({name, id, email, school}) => {
                this.employees.push(new Intern(name, id, email, school));
                this.addMemberMenu();
            });
    };

    pageTemplate() {
        return writeFile(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">            
            <link rel="stylesheet" href="../src/style.css">
            <title>Team Roster</title>
        </head>
    
        <body class="container">
            <header class="row">
                <div class="col-sm-12 text-center my-3">
                    <h1 class="page-title">Team Roster</h1>
                </div>
            </header>
    
            <main class="container">
                <div class="row justify-content-around">
            ${this.employees
                .filter(({ officeNumber }) => officeNumber)
                .map(({ name, id, email, officeNumber}) => {
                    return `<div class="col-md-5 m-2 p-0 card shadow border border-success rounded">
                        <h3 class="card-title bg-success m-0 p-3">${name}</h3>
                        <div class="card-body">
                            <h5 class="card-subtitle text-secondary mb-2"><i class="fa-solid fa-briefcase"></i> Manager</h5>
                            <p class="card-text">Employee ID: ${id}</p>
                            <p class="card-text">Office Number: ${officeNumber}</p>
                            <p class="card-link">Email: <a href="mailto: ${email}" class="text-success">${email}</a></p>
                        </div>
                    </div>`;
                })
                .join(" ")}
            ${this.employees
                .filter(({ github }) => github)
                .map(({ name, id, email, github}) => {
                    return `<div class="col-md-5 m-2 p-0 card shadow border border-info rounded">
                            <h3 class="card-title bg-info m-0 p-3">${name}</h3>
                        <div class="card-body">
                            <h5 class="card-subtitle text-secondary mb-2"><i class="fa-solid fa-calculator"></i></i> Engineer</h5>
                            <p class="card-text">Employee ID: ${id}</p>
                            <p class="card-text">GitHub Username: <a href="https://github.com/${github}" target="_blank" class="text-info">${github}</a></p>
                            <p class="card-link">Email: <a href="mailto: ${email}" class="text-info">${email}</a></p>
                        </div>
                    </div>`;
                })
                .join(" ")}
            ${this.employees
                .filter(({ school }) => school)
                .map(({ name, id, email, school}) => {
                    return `<div class="col-md-5 m-2 p-0 card shadow border border-warning rounded">
                        <h3 class="card-title bg-warning m-0 p-3">${name}</h3>
                        <div class="card-body">
                            <h5 class="card-subtitle text-secondary mb-2"><i class="fa-solid fa-graduation-cap"></i> Intern</h5>
                            <p class="card-text">Employee ID: ${id}</p>
                            <p class="card-text">University: ${school}</p>
                            <p class="card-link">Email: <a href="mailto: ${email}" class="text-warning">${email}</a></p>
                        </div>
                    </div>`;
                })
                .join(" ")}
                </div>
            </main>
            
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
        </html>
        `);
    };
};

module.exports = Roster;