const Roster = require('../lib/Roster');

test('does it correctly change userInput array', () => {
    // checks if manager switch case works
    const rosterManager = new Roster().promptUserInput('manager');
    expect(rosterManager[3].name).toEqual("officeNumber");

    // checks if engineer switch case works
    const rosterEngineer = new Roster().promptUserInput('engineer');
    expect(rosterEngineer[3].name).toEqual("github");

    // checks if intern switch case works
    const rosterIntern = new Roster().promptUserInput('intern');
    expect(rosterIntern[3].name).toEqual("school");
});