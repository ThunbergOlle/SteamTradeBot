//Gets and sends the configs.
var fs = require('fs');
var array = require('../config.json');

module.exports.confighandler = function confighandler (label, data) {
    console.log('Changing the config file...');
    console.log('Gameid changed to: ' + data);
    array[label] = data;
    var json = JSON.stringify(array);
    fs.writeFile('config.json', json, 'utf8');
    
}