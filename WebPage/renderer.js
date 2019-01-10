//Here is the javascript part of the index.html file.
const ipcRenderer = require('electron').ipcRenderer;
let title = document.getElementById('title');
let status = document.getElementById('status');
let tradestoday = document.getElementById('tradestoday');
let tradestodaynum = 0;
let totalprofit = document.getElementById('totalprofit');
let totalprofitnum = 0;
let messages = document.getElementById('messages');

ipcRenderer.on('accepted', (event, data) => {
    let ourprice = data.ourprice;
    let theirprice = data.theirprice;
    let profit = data.profit;
    let partner = data.partner;
    let message = document.createElement('div');
    message.setAttribute('class', 'chat-message');
    message.textContent = 'Trade with: ' + partner + ', profit: ' + profit;
    tradestodaynum += 1;
    totalprofitnum += profit;
    tradestoday.innerHTML = 'Trades today: ' + tradestodaynum;
    totalprofit.innerHTML = 'Total profit: ' + totalprofitnum;
    messages.appendChild(message);
    messages.insertBefore(message, messages.firstChild);
});
