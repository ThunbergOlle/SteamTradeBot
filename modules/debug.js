const fs = require('fs');
const time = require('node-get-time');
const util = require('util');

let log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });

module.exports = async (d) => {
    log_file.write("[" + time.now() + "] " + util.format(d) + '\n');
}