const configjs = require('../../../modules/config');
let game = document.getElementById('game');
let label = document.getElementById('label');
let btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    configjs.confighandler('game', game.value);
    label.innerHTML = 'Updated to game: ' + game.value;
    window.close();
});
