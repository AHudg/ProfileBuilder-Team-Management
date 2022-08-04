const fs = require('fs');

const printRosterHtml = (data) => { {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/teamRoster.html', data, err => {
            // if the write file could not be written for some reason, throw error
            if (err) {
                reject(err);
                return;
            };

            resolve({
                ok: true,
                message: 'HTML was created.'
            });
        });
    });
}};

module.exports = printRosterHtml;