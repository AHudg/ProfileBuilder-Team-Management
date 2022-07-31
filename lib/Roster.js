const inquirer = require('inquirer');
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
                    console.log('Finished the roster!');
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
                console.log(this.employees)
                this.addMemberMenu();
            });
    };
};

module.exports = Roster;