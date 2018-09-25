const configjs = require('../../../modules/config.js');
const config = require('../../../config.json');
const username = document.getElementById("username");
const password = document.getElementById("password");
username.value = config.username;
password.value = config.password;
if (password.value === 'Steam password') {
    password.type = "text"
}
password.addEventListener("click", () => {
    password.type = "password";
});
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    if (username.value !== '' && password.value !== '') {
        configjs.confighandler('username', username.value);
        wait = () => {
            configjs.confighandler('password', password.value);
            window.close();

        }
        setTimeout(wait, 1000);
    }
});