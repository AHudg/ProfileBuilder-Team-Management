const Engineer = require('../lib/Engineer');

test('creates an engineer object', () => {
    const engineer = new Engineer('Andrew', 'AHudg');

    expect(engineer.github).toEqual(expect.any(String));
});