const Engineer = require('../lib/Engineer');

describe('tests the creation and methods of Engineer', () => {
    test('creates an engineer object', () => {
        const engineer = new Engineer('Andrew', 1, 'ahudg@ahudg.com', 'AHudg');
        expect(engineer.name).toBe('Andrew');
        expect(engineer.id).toEqual(expect.any(Number));
        expect(engineer.email).toEqual(expect.any(String));
        expect(engineer.github).toEqual(expect.any(String));
    });

    test('checks that getRole returns Engineer', () => {
        const engineer = new Engineer('Andrew', 1, 'ahudg@ahudg.com', 'AHudg');
        expect(engineer.getRole()).toBe('Engineer');
    })

    test('checks that getGithub returns the objects github', () => {
        const engineer = new Engineer('Andrew', 1, 'ahudg@ahudg.com', 'AHudg');
        expect(engineer.getGithub()).toEqual('AHudg');
    })
});