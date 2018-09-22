//Gets and sends the configs.
var fs = require('fs'); //Requires fs for filesystem and editing config.json file
var array = require('../config.json'); //Import config.json file into javascript file.

module.exports.confighandler = function confighandler (label, data) { //Creates function that takes in a label and some data that it will change to inside config.json
    console.log('Changing the config file...');
    console.log(label + ' changed to: ' + data);
    array[label] = data; //Changes the selected data.
    var json = JSON.stringify(array);//Stringifies it.
    fs.writeFile('config.json', json, 'utf8', (err) => {
        if(err) throw err;
    });//Writes it back to the config.json file.   
}