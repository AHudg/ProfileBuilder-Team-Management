const Manager = require('../lib/Manager');

test('creates the manager constructor', () => {
    const manager = new Manager('Andrew', 1);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});