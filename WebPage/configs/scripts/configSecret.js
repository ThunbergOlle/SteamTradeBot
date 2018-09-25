const configjs = require('../../../modules/config');
const config = require('../../../config.json');
const electron = require('electron');
const shell = electron.shell;
const iSecret = document.getElementById('iSecret');
const sSecret = document.getElementById('sSecret');
iSecret.value = config.identitySecret;
sSecret.value = config.sharedSecret;
const label = document.getElementById('label');
let btn = document.getElementById('btn');
let externalLink = document.getElementById('link');
link.addEventListener('click', () => {
    shell.openExternal('https://github.com/SteamTimeIdler/stidler/wiki/Getting-your-%27shared_secret%27-code-for-use-with-Auto-Restarter-on-Mobile-Authentication#getting-shared-secret-from-steam-desktop-authenticator-windows');
});
btn.addEventListener('click', () => {
    if (iSecret.value !== '') {
        configjs.confighandler('identitySecret', iSecret.value);
    }
    if(sSecret.value !== ''){
        configjs.confighandler('sharedSecret', sSecret.value);
    }
    window.close();
    label.innerHTML = 'Updated values';

});
