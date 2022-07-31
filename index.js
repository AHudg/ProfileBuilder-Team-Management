const Roster = require('./lib/Roster');

const roster = new Roster();
console.log(roster.employees);
roster.addNewManager();

setTimeout((myConsole) => {console.log(roster.employees);}, 60000);