// This script is for reading the values so we get live updates.
const fs = require('fs');

module.exports.readValue = (title, callback) => {
    fs.readFile('config.json', (err, data) => {
        if (err) debug(err);
        data = JSON.parse(data);
        callback(data[title]);
    });
}
module.exports.readValues = (callback) => {
    fs.readFile('config.json', (err, data) => {
        if (err) debug(err);
        data = JSON.parse(data);
        callback(data);
    });
}