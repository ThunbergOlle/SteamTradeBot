//BOT DEVELOPED BY CLOUDIAN.
//PLEASE CONSIDER DONATING IF YOU FIND THIS BOT USEFULL.
//Youtube: https://www.youtube.com/channel/UCfh05PLfZXIEBGh-z4M6LyQ
//Don't SELL this script to other.

//Thanks.
const market = require('steam-market-pricing');
const config = require('./config.json'); //This requires the config file.
const SteamTotp = require('steam-totp'); //Requires a module
const SteamUser = require('steam-user'); //Requires a module for login ect.
const SteamCommunity = require('steamcommunity'); //Requires a module for the steam communit
const TradeOfferManager = require('steam-tradeoffer-manager'); //Requires a module for handling trade offers.
const socket = require('socket.io').listen(4000).sockets;
const colors = require('colors');
const underscore = require('underscore');
const readline = require('readline');
const electron = require('electron');
const remote  = require('electron').remote;
const {app, BrowserWindow, Menu} = electron;
const path = require('path');
const url = require('url');
let win;
var gameid = config.game;
const trash = config.trashlimit;


const fs = require('fs');
const client = new SteamUser(); //CREATES A NEW CLIENT FOR SteamTotp
const community = new SteamCommunity();

const manager = new TradeOfferManager({ //CREATES A NEW MANAGER for trades
  steam: client,
  community: community,
  language: 'en'
  //SOME Basic information about trade offers
});

//BASIC DISPLAY INFORMATION ON STARTUP
console.log('This bot was developed by CloudiaN'.cyan);
console.log('Verision 1.2.1'.cyan);
console.log('Open sourcecode'.cyan);
console.log('Loading config file...'.green);
console.log('\n');
console.log('\n');
const logOnOptions = {
  accountName: config.username, //SETS THE ACCOUNT NAME TO THE CONFIG NAME
  password: config.password, //SETS THE ACCOUNT PASSWORD TO THE CONFIG PASSWORD
  twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret) //Generating the steam auth code.
};

client.logOn(logOnOptions); //Logged in with the login options.

client.on('loggedOn', () => { //When it's logged in.
  console.log(`Logged into steam with account: ${config.username}`.green); //Displays the name of the account that's logged in.
  console.log('\n');
  console.log('Skin trash limit set to: ' + config.trashlimit);
  client.setPersona(SteamUser.Steam.EPersonaState.Online); //Shows that the bot is online.
  client.gamesPlayed("Bot"); //DISPLAYS The games that it plays.
});
//Start when ready
app.on('ready', function(){
  win = new BrowserWindow({width: 800, height: 600, icon:__dirname+'/img/bot.png', show: true});
  win.loadURL(url.format({
    pathname: path.join(__dirname +'/WebPage/index.html'),
    protocol: 'file',
    slashes: true
  }));

  //Build Menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert menu into app.
  win.webContents.openDevTools()
  Menu.setApplicationMenu(mainMenu);
  
});

const mainMenuTemplate = [{
  
  label: 'File',
  submenu: [
    {
      label: 'Pause'
    },
    {
      label: 'Exit', 
      click: function(){
        app.quit();
      }
    }
  ],
  },
  {
  label: 'Config',
  submenu: [
    {
      label: 'Identity and Shared secret'
    },
    {
      label: 'Username and Passwords'
    },
    {
      label: 'Games',
      click: function(){
          smallwin = new BrowserWindow({width: 350, height: 300});
          smallwin.loadURL(url.format({
          pathname: path.join(__dirname +'/WebPage/configs/configGames.html'),
          protocol: 'file',
          slashes: true
  }));
      }
    },
    {
      label: 'Trashlimit'
    }
  ]
  },
  {
  label: 'Settings',
  submenu: [
    {
      label: 'Preferences',
    },
    {
      label: 'Privacy'
    },
    {
      label: 'Connection'
    }
  ]
  
}];
//Close when window is closed
app.on('window-all-closed', function(){
    if(process.platform !== 'win32'){
      app.quit();
    }
});

//CHECKS For confirmations or offers to trade.
client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
    community.startConfirmationChecker(2000, config.identitySecret);
});
socket.on('connection', function(socket){
  
  function sendStatus(ourprice, theirprice, profit, partner){
    if(ourprice != undefined){
      socket.emit('accepted', {
        ourprice: ourprice,
        theirprice: theirprice,
        profit: profit,
        partner: partner
      });
    }
}

function acceptOffer(offer){ //Function for accepting an offer that someone has sent.
  /*offer.accept((err) => { //Accepts the offer
    community.checkConfirmations(); //CHECKS FOR CONFIRMATIONS
    if(err) console.log("Could not accept offer. There was an error".red); //If we get an error
  });
*/
}
function declineOffer(offer) { //Function for declining an offer that someone has sent.
  offer.decline((err) => { //This declines the offer
    if(err) console.log("Could not decline offer. There was an error".red); //If we get an error
  });

}
function processOffer(offer){

  if(offer.isGlitched() || offer.state === 11) { //IF THE offer was glitched
    console.log("The offer was glitched, declining".red);
    declineOffer(offer); //DECLINES OFFER
  }
  else if (offer.partner.getSteamID64() === config.ownerID){ //If the owner is withdrawing items from the bot.
    acceptOffer(offer); //Accepts offer
  }
  else {
    console.log('\n');
    console.log('================= New Trade ===================='.green);
    console.log('The bot is now making calculations and checking \n prices, this step may take a while.');
    var partner = offer.partner.getSteamID64();
    var theirprice = 0;
    var ourprice = 0;
    var ourItems = offer.itemsToGive; //All of our items
    var theirItems = offer.itemsToReceive; //All of the trade partners items
    var ourValue = 0; //Our items in a value
    var theirValue = 0; //Their items in a value

    var allitems = []; //Sets up a new array with all their items in.
    var allourItems = []; //Sets up a new array with all our items in.
    for (var i in theirItems) { //For each in "theirItems"
      allitems.push(theirItems[i].market_name); //Pushes each into an array.
    }

    for (var i in ourItems){ //For each in "ourItems"
      allourItems.push(ourItems[i].market_name); //Pushes each into an array.
    }
    if(allitems.length > 0){
    market.getItemsPrice(gameid, allitems, function(data){

      for (var i in allitems){

        var inputData = data[allitems[i]]['lowest_price'];
        if(inputData != undefined){
        var tostring = inputData.toString();
        var currentData = tostring.slice(1, 5);
        var parseData = parseFloat(currentData);
        if(parseData < trash){
          parseData = 0.01;
          theirprice += parseData;
          console.log("They offered a trash skin: ".red + allitems[i]); //Shows what they offered.
        }else {
        theirprice += parseData;
        console.log("They offered: ".red + allitems[i]); //Shows what they offered.
        }
        }
      }
      console.log('Their Value: '.blue + theirprice);
      market.getItemsPrice(gameid, allourItems, function(data){ //Get all our items from the trade.
        for (var i in allourItems){
          var ourinputData = data[allourItems[i]]['lowest_price']; //Checks the lowest price for the item
          var ourtostring = ourinputData.toString(); //Makes it to a string.
          var ourcurrentData = ourtostring.slice(1, 5); //Removes the '$' character.
          var ourparseData = parseFloat(ourcurrentData); //Makes it to a float
          ourprice += ourparseData; //Adds it to the price
          console.log("We offered ".green + allourItems[i]); //Shws what we offered in the console.
        }
        console.log('Our Value: '.blue + ourprice);
        if (ourprice <= theirprice) { //IF our value is smaller than their, if they are overpaying
        acceptOffer(offer); //Accepts the offer
        var profitprice = theirprice - ourprice; //calculates the profit from the trade
        console.log('Accepted with profit: '.green + profitprice); //Logs the profit made by the trade
        console.log('================================================'.green);
        //NYTT KANSKE TA BORT.
        sendStatus(ourprice, theirprice, profitprice, partner);
        fs.writeFile("./trades/" + offer.id + ".txt", 'Profit from trade: ' + profitprice + "\n" + 'New items: ' + allitems, function (err){
          if (err) throw err;

        });
        }
        else { //If we are overpaying.
        declineOffer(offer); //Declines the offer
        console.log('Declined the offer.'.red); //Logs that it's declines the offer
        console.log('================================================'.green);
        }
      });
    });


  } else {
        declineOffer(offer); //Declines the offer
        console.log('Declined the empty offer.'.red); //Logs that it's declines the offer
        console.log('================================================'.green);
  }
  }

}
manager.on('newOffer', (offer) => { //If we get a new offer
  processOffer(offer); //Do the process function.
});









//ALL SOCKETS THATS RECIEVING SOME KIND OF INFORMATION.

socket.on('configGames', function(data){
  let newgame = data.game;
  console.log('Trying to change the config file...');
  //JSON FILE VAR  = 'config'
  var array = config;
  array.game = newgame;
  var json = JSON.stringify(array);
  fs.writeFile('config.json', json, 'utf8');
  //console.log(array);
  gameid = newgame;
  console.log('Gameid changed to: ' + newgame);
});

});