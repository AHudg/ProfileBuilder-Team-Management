const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, github) {
        super(name);
        this.github = github;
    };
};

module.exports = Engineer;