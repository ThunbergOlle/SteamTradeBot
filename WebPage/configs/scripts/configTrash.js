const configjs = require('../../../modules/config');
const trashlimit = document.getElementById('trashlimit');
const label = document.getElementById('label');
let btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    configjs.confighandler('trashlimit', trashlimit.value);
    label.innerHTML = 'Updated to game: ' + trashlimit.value;

});
