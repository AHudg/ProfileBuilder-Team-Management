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
                return this.addMemberMenu();
            });
    };

    promptUserInput(jobPosition) {
        const userInput = [
            {
                type: 'text',
                name: 'name',
                message: `What is the ${jobPosition}'s name?`
            },
            {
                type: 'text',
                name: 'id',
                message: `What is the ${jobPosition}'s ID?`
            },
            {
                type: 'text',
                name: 'email',
                message: `What is the ${jobPosition}'s email?`
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
                    return this.addNewEngineer();
                } else if (menu === 'Add an Intern') {
                    return this.addNewIntern();
                } else {
                    return this.createMainData();
                }
            });
            // .then(htmlResponse => {
            //     return this.printRosterHtml('Roster', htmlResponse);
            // })
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
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">            <link rel="stylesheet" href="style.css">
            <title>Team Roster</title>
        </head>

        <body class="container">
            <header class="row">
                <div class="col-sm-12">
                    <h1 class="page-title">Team Roster</h1>
                </div>
            </header>

            <main class="container">
                <div class="row">
            ${this.employees.map(({ name, id, email}) => {
                    return `
                    ${name}
                    `;
            })}
                </div>
            </main>

            <footer class="container text-center py-3">
                <h3 class="text-dark">&copy; ${new Date().getFullYear()}</h3>
            </footer>
            
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
    };

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