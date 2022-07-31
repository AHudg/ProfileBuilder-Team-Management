const Employee = require('../lib/Employee');

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