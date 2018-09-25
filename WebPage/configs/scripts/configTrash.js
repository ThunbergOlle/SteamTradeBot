const configjs = require('../../../modules/config');
const config = require('../../../config.json');
const trashlimit = document.getElementById('trashlimit');
trashlimit.value = config.trashlimit;
const label = document.getElementById('label');
let btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    configjs.confighandler('trashlimit', trashlimit.value);
    label.innerHTML = 'Updated to game: ' + trashlimit.value;
    window.close();
});
