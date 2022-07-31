const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

class Roster {
    constructor() {
        this.employees = [];
    };

    addNewManager() {
        console.log("Welcome Manager! Let's build you a team roster! First, we'll start with you.");
        const inputArray = this.promptUserInput('manager');
        inquirer
            .prompt(inputArray)
            .then(({name, id, email, officeNumber}) => {
                this.employees.push(new Manager(name, id, email, officeNumber));
                this.addMemberMenu();
            });
    };

    promptUserInput(jobPosition) {
        const userInput = [
            {
                type: 'text',
                name: 'name',
                message: "What is the employee's name?"
            },
            {
                type: 'text',
                name: 'id',
                message: "What is the employee's ID?"
            },
            {
                type: 'text',
                name: 'email',
                message: "What is the employee's email?"
            }];
        
        switch (jobPosition) {
            case 'manager':
                userInput.push({ type: 'text', name: 'officeNumber', message: "What is manager's office number?" });
                return userInput
            case 'engineer':
                userInput.push({ type: 'text', name: 'github', message: "What is the engineer's GitHub username?" });
                return userInput
            case 'intern':
                userInput.push({ type: 'text', name: 'school', message: "What is the name of the school the intern attends?" });
                return userInput
        };
    };

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
                    this.addNewEngineer();
                } else if (menu === 'Add an Intern') {
                    this.addNewIntern();
                } else {
                    return this.createMainData();
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

    createMainData() {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
            <link rel="stylesheet" href="style.css">
            <title>Team Roster</title>
        </head>

        <body>
            <header>
                <div class="container flex-row">
                    <h1 class="page-title text-secondary bg-dark py-2 px-3">Team Roster</h1>
                </div>
            </header>

            <main class="container my-5">
            ${this.createCardData}
            </main>

            <footer class="container text-center py-3">
                <h3 class="text-dark">&copy; ${new Date().getFullYear()}</h3>
            </footer>
        </body>
        </html>
        `;
    }

    createCardData() {

    }

    printRosterHtml(filName, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile('../dist/'+filName+'.html', data, err => {
                if (err) {
                    reject(err);
                    return;
                };

                resolve({
                    ok: true,
                    message: 'HTML was created.'
                });
            });
        });
    };
};

module.exports = Roster;