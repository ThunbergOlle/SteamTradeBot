//Here is the javascript part of the index.html file.
const ipcRenderer = require('electron').ipcRenderer;
var title = document.getElementById('title');
var status = document.getElementById('status');
var tradestoday = document.getElementById('tradestoday');
var tradestodaynum = 0;
var totalprofit = document.getElementById('totalprofit');
var totalprofitnum = 0;
var messages = document.getElementById('messages');

ipcRenderer.on('accepted', (event, data) => {
    let ourprice = data.ourprice;
    let theirprice = data.theirprice;
    let profit = data.profit;
    let partner = data.partner;
    var message = document.createElement('div');
    message.setAttribute('class', 'chat-message');
    message.textContent = 'Trade with: ' + partner + ', profit: ' + profit;
    tradestodaynum += 1;
    totalprofitnum += profit;
    tradestoday.innerHTML = 'Trades today: ' + tradestodaynum;
    totalprofit.innerHTML = 'Total profit: ' + totalprofitnum;
    messages.appendChild(message);
    messages.insertBefore(message, messages.firstChild);
});
