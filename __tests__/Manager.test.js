const Manager = require('../lib/Manager');

describe('tests the creation and methods of managers', () => {
    test('creates the manager constructor', () => {
        const manager = new Manager('Andrew', 1, 'ahudg@ahudg.com', 1);
        expect(manager.name).toBe('Andrew');
        expect(manager.id).toEqual(expect.any(Number));
        expect(manager.email).toEqual(expect.any(String));
        expect(manager.officeNumber).toEqual(expect.any(Number));
    });

    test('checks that getRole returns manager', () => {
        const manager = new Manager('Andrew', 1, 'ahudg@ahudg.com', 1);
        expect(manager.getRole()).toBe('Manager');
    })
});