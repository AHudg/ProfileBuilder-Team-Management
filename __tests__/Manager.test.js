const Manager = require('../lib/Manager');

test('creates the manager constructor', () => {
    const manager = new Manager('Andrew', 1, 'ahudg@ahudg.com', 1);
    expect(manager.name).toBe('Andrew');
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(Number));
});