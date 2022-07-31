const Employee = require('../lib/Employee');

describe('tests the Employee constructor', () => {
    test('creates an employee object', () => {
        const employee = new Employee('Andrew', 1, 'ahudg@ahudg.com');
        expect(employee.name).toBe('Andrew');
        expect(employee.id).toEqual(expect.any(Number));
        expect(employee.email).toEqual(expect.any(String));
    })

    test('checks if getName returns object name', () => {
        const employee = new Employee('Andrew', 1, 'ahudg@ahudg.com');
        expect(employee.getName()).toBe('Andrew');
    })

    test('checks if getId returns the object ID', () => {
        const employee = new Employee('Andrew', 1, 'ahudg@ahudg.com');
        expect(employee.getId()).toEqual(1);
    })

    test('checks if getEmail returns the object email', () => {
        const employee = new Employee('Andrew', 1, 'ahudg@ahudg.com');
        expect(employee.getEmail()).toBe('ahudg@ahudg.com');
    })
});