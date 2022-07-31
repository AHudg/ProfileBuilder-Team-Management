const Intern = require('../lib/Intern');

test('creates an intern object', () => {
    const intern = new Intern('Andrew', 1, 'ahudg@ahudg.com', 'school');
    expect(intern.name).toBe('Andrew');
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
});