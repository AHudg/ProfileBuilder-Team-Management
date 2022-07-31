const inquirer = require('inquirer');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

class Roster {
    constructor() {
        this.employees = [];
    };

    addNewManager() {
        inquirer
            .prompt([{
                type: 'text',
                name: 'name',
                message: 'What is your name?'
            },
            {
                type: 'text',
                name: 'id',
                message: 'What is your employee ID?'
            },
            {
                type: 'text',
                name: 'email',
                message: 'What is your email?'
            },
            {
                type: 'text',
                name: 'officeNumber',
                message: 'What is your office number?'
            }])
            .then(({name, id, email, officeNumber}) => {
                this.employees.push(new Manager(name, id, email, officeNumber));
                this.addMemberMenu();
            });
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
        inquirer
            .prompt([{
                type: 'text',
                name: 'name',
                message: 'What is your name?'
            },
            {
                type: 'text',
                name: 'id',
                message: 'What is your employee ID?'
            },
            {
                type: 'text',
                name: 'email',
                message: 'What is your email?'
            },
            {
                type: 'text',
                name: 'github',
                message: 'What is your GitHub username?'
            }])
            .then(({name, id, email, github}) => {
                this.employees.push(new Engineer(name, id, email, github));
                this.addMemberMenu();
            });
    };

    addNewIntern() {
        inquirer
            .prompt([{
                type: 'text',
                name: 'name',
                message: 'What is your name?'
            },
            {
                type: 'text',
                name: 'id',
                message: 'What is your employee ID?'
            },
            {
                type: 'text',
                name: 'email',
                message: 'What is your email?'
            },
            {
                type: 'text',
                name: 'school',
                message: 'What is the name of the school you attend?'
            }])
            .then(({name, id, email, school}) => {
                this.employees.push(new Intern(name, id, email, school));
                console.log(this.employees)
                this.addMemberMenu();
            });
    };
};

module.exports = Roster;