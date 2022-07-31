const Intern = require('../lib/Intern');

test('creates an intern object', () => {
    const intern = new Intern('Andrew', 'school');

    expect(intern.school).toEqual(expect.any(String));
});