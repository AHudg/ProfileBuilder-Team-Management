const Intern = require('../lib/Intern');

describe('tests the creation and methods of Intern', () => {
    test('creates an intern object', () => {
        const intern = new Intern('Andrew', 1, 'ahudg@ahudg.com', 'school');
        expect(intern.name).toBe('Andrew');
        expect(intern.id).toEqual(expect.any(Number));
        expect(intern.email).toEqual(expect.any(String));
        expect(intern.school).toEqual(expect.any(String));
    });

    test('checks that getRole returns Intern', () => {
        const intern = new Intern('Andrew', 1, 'ahudg@ahudg.com', 'school');
        expect(intern.getRole()).toBe('Intern');
    })

    test('checks that getSchool returns the objects school', () => {
        const intern = new Intern('Andrew', 1, 'ahudg@ahudg.com', 'school');
        expect(intern.getSchool()).toBe(intern.school);
    })
});