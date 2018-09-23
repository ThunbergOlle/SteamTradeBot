const configjs = require('../../../modules/config');
var id = document.getElementById('id');
let btn = document.getElementById('btn');
let label = document.getElementById('label');

btn.addEventListener('click', () => {
    configjs.confighandler('ownerID', id.value);
    label.innerHTML = 'Updated to ownerid: ' + id.value;
});
