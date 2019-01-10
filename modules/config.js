//Gets and sends the configs.
let fs = require('fs'); //Requires fs for filesystem and editing config.json file
let array = require('../config.json'); //Import config.json file into javascript file.

module.exports.confighandler = function confighandler (label, data) { //Creates function that takes in a label and some data that it will change to inside config.json
    console.log('Changing the config file...');
    console.log(label + ' changed to: ' + data);
    array[label] = data; //Changes the selected data.
    let json = JSON.stringify(array);//Stringifies it.
    fs.writeFile('config.json', json, 'utf8', (err) => {
        if(err) throw err;
        return;
    });//Writes it back to the config.json file.   
}