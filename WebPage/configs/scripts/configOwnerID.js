const configjs = require('../../../modules/config');
const config = require('../../../config.json');
const id = document.getElementById('id');
id.value = config.ownerID;
let btn = document.getElementById('btn');
let label = document.getElementById('label');

btn.addEventListener('click', () => {
    configjs.confighandler('ownerID', id.value);
    label.innerHTML = 'Updated to ownerid: ' + id.value;
    window.close();
});
