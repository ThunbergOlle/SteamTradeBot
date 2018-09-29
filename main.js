//BOT DEVELOPED BY CLOUDIAN.
//PLEASE CONSIDER DONATING IF YOU FIND THIS BOT USEFULL.
//Youtube: https://www.youtube.com/channel/UCfh05PLfZXIEBGh-z4M6LyQ
//Thanks.
// const market = require('steam-market-pricing');
const market = require('./modules/steam-market-pricing');
const config = require('./config.json'); //This requires the config file.
const SteamTotp = require('steam-totp'); //Requires a module
const SteamUser = require('steam-user'); //Requires a module for login ect.
const SteamCommunity = require('steamcommunity'); //Requires a module for the steam communit
const TradeOfferManager = require('steam-tradeoffer-manager'); //Requires a module for handling trade offers.
const fs = require('fs');
const time = require('node-get-time');
const util = require('util');
const colors = require('colors'); //Requires colors.
const underscore = require('underscore');//Requires underscore
const readline = require('readline'); //Requires readline for editing config.json file
const electron = require('electron'); //Requires electron for the user interface and desktop app.
const configjs = require('./modules/config.js');//Loads a module called config.js inside modules folder.
const remote = require('electron').remote; //Electrons
const { app, BrowserWindow, Menu, ipcMain } = electron; //Makes different variables that is equal to require electron.
const path = require('path'); //Module for path finding inside the project.
const url = require('url'); //Module for url.
let win; //Sets up temporary variable that will be set later in the script.
const gameid = config.game;
const trash = config.trashlimit; //Sets up the trash limit to a custom variable.d
const offerStatusLog = require('./modules/offerStatuslog.js'); //For logging the status of the trade.


// LOGGING
var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
debug = (d) => {
  log_file.write("[" + time.now() + "] " + util.format(d) + '\n');
}

// LOGGING
debug("Loaded debug.");
const client = new SteamUser(); //CREATES A NEW CLIENT FOR SteamTotp
const community = new SteamCommunity(); //Sets up new community.

const manager = new TradeOfferManager({ //CREATES A NEW MANAGER for trades
  steam: client,
  community: community,
  language: 'en'
  //SOME Basic information about trade offers
});
debug("New tradeoffer-manager was setup.");

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
debug("Tried to logon with account credentials");
client.on('loggedOn', () => { //When it's logged in.
  console.log(`Logged into steam with account: ${config.username}`.green); //Displays the name of the account that's logged in.
  console.log('\n');
  console.log('Skin trash limit set to: ' + config.trashlimit);
  client.setPersona(SteamUser.Steam.EPersonaState.Online); //Shows that the bot is online.
  client.gamesPlayed(config.GameTitle); //DISPLAYS The games that it plays.
  debug("Logged on to steam");
});
//Start when ready
app.on('ready', function () { //When the app is ready.
  debug("Loaded App");
  win = new BrowserWindow({ width: 800, height: 600, icon: __dirname + '/img/bot.png', show: true }); //Initialized a new window.
  win.loadURL(url.format({
    pathname: path.join(__dirname + '/WebPage/index.html'), //Loading the URL.
    protocol: 'file',
    slashes: true
  }));
  debug("Loaded BrowserMenu");
  //Build Menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate); //Building the menu.
  //Insert menu into app.
  Menu.setApplicationMenu(mainMenu); //Sets menu template

});

//THIS SECTION IS FOR THE TEMPLATE AND NAVIGATION ON TOP OF THE UI WINDOW.
const mainMenuTemplate = [{

  label: 'File',
  submenu: [
    {
      label: 'Pause'
    },
    {
      label: 'Exit',
      click: function () {
        app.quit();
      }
    }
  ],
},
{
  label: 'Config',
  submenu: [
    {
      label: 'Account',
      click: function () {
        smallwin = new BrowserWindow({ width: 350, height: 450 });
        smallwin.loadURL(url.format({
          pathname: path.join(__dirname + '/WebPage/configs/configAccount.html'),
          protocol: 'file',
          slashes: true,
        }));
        smallwin.setMenu(null);
      }
    },
    {
      label: 'Games',
      click: function () { //This handles when the label is clicked.
        smallwin = new BrowserWindow({ width: 350, height: 300 });
        smallwin.loadURL(url.format({
          pathname: path.join(__dirname + '/WebPage/configs/configGames.html'),
          protocol: 'file',
          slashes: true,
        }));
        smallwin.setMenu(null);
      }
    },
    {
      label: 'Trashlimit',
      click: function () {//This handles when the label is clicked.
        smallwin = new BrowserWindow({ width: 350, height: 300 });
        smallwin.loadURL(url.format({
          pathname: path.join(__dirname + '/WebPage/configs/configTrash.html'),
          protocol: 'file',
          slashes: true
        }));
        smallwin.setMenu(null);
      }
    },
    {
      label: 'OwnerID',
      click: function () { //This handles when the label is clicked.
        smallwin = new BrowserWindow({ width: 350, height: 300 });
        smallwin.loadURL(url.format({
          pathname: path.join(__dirname + '/WebPage/configs/configOwnerID.html'),
          protocol: 'file',
          slashes: true,
        }));
        smallwin.setMenu(null);
      }
    },
    {
      label: 'Secrets',
      click: function () {
        smallwin = new BrowserWindow({ width: 350, height: 450 });
        smallwin.loadURL(url.format({
          pathname: path.join(__dirname + '/WebPage/configs/secrets.html'),
          protocol: 'file',
          slashes: true,
        }));
        smallwin.setMenu(null);
      }
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
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') { // if your system is other than MacOS (Thanks hartlomiej!)
    debug("App Shutdown");
    app.quit();//Quit the desktop app completely.
  }
});

//CHECKS For confirmations or offers to trade.
client.on('webSession', (sessionid, cookies) => {
  manager.setCookies(cookies);
  community.setCookies(cookies);
  community.startConfirmationChecker(2000, config.identitySecret);
});

function sendStatus(ourprice, theirprice, profit, partner) {

  if (ourprice != undefined) { //Checking if the ourprice is not defined.
    win.webContents.send('accepted', {
      ourprice: ourprice,
      theirprice: theirprice,
      profit: profit,
      partner: partner
    });
  }
}

function acceptOffer(offer, profit) { //Function for accepting an offer that someone has sent.
  debug("Accepted offer");
  offer.accept((err) => { //Accepts the offer
    if (err) debug(err); //If we get an error
    community.checkConfirmations(); //CHECKS FOR CONFIRMATIONS
    offerStatusLog(true, profit);
  });
}
function declineOffer(offer) { //Function for declining an offer that someone has sent.
  debug("Declined offer");
  offer.decline((err) => { //This declines the offer
    if (err) debug(err); //If we get an error
    offerStatusLog(false, 0);
  });
}
function processOffer(offer) {
  debug("Proccessing offer");
  if (offer.isGlitched() || offer.state === 11) { //IF THE offer was glitched
    console.log("The offer was glitched, declining".red);
    debug("Offer glitched");
    declineOffer(offer); //DECLINES OFFER
  }
  else if (offer.partner.getSteamID64() === config.ownerID) { //If the owner is withdrawing items from the bot.
    acceptOffer(offer); //Accepts offer
    debug("Trade partner is owner");
  }
  else {

    var partner = offer.partner.getSteamID64(); //Gets the partners steam64 id,
    var theirprice = 0; //Tmp
    var ourprice = 0;//Tmp
    var ourItems = offer.itemsToGive; //All of our items
    var theirItems = offer.itemsToReceive; //All of the trade partners items
    var ourValue = 0; //Our items in a value
    var theirValue = 0; //Their items in a value

    var allitems = []; //Sets up a new array with all their items in.
    var allourItems = []; //Sets up a new array with all our items in.
    debug("Variables setup for trade");
    for (var i in theirItems) { //For each in "theirItems"
        allitems.push(theirItems[i].market_hash_name); //Pushes each into an array.
    }
    debug("Their items are: " +allitems);
    for (var i in ourItems) { //For each in "ourItems"
        allourItems.push(ourItems[i].market_hash_name); //Pushes each into an array.
    }
    debug("Our items are: " +allourItems);

    if (allitems.length > 0) {
      debug("allitems.length is bigger than 0");
      debug("Trying to get market prices for items");
      debug(gameid, allitems);
      market.getItemsPrice(gameid, allitems, function (data) {
        debug(data);
        debug("Loaded Market Prices for the partner");
        console.log('\n');
        console.log('================= New Trade ===================='.green);
        console.log('The bot is now making calculations and checking \n prices, this step may take a while.');
        for (var i in allitems) {
          
          var inputData = data[i].lowest_price;
          if (inputData !== undefined) { //If we actually get a response continue the script...
            var tostring = inputData.toString(); //Gets the data and converts it into a string.
            var currentData = tostring.slice(1, 5); //Removes part of the string.
            var parseData = parseFloat(currentData); //Sends it back to a float value.
            if (parseData < trash) { //Checks if their item value is bigger than our limit. 
              parseData = 0.01; //Remove value of current item.
              theirprice += parseData;
              console.log("They offered a trash skin: ".red + data[i].name); //Shows what they offered.
            } else {
              theirprice += parseData;
              console.log("They offered: ".red + data[i].name); //Shows what they offered.
            }
          } else {
            console.log('Someone tried to trade items from another game..');
          }
        }
        console.log('Their Value: '.blue + theirprice);
        if (allourItems.length == 0) {
          debug("No items from us inside the tradeoffer");
          acceptOffer(offer);

        } else {
          market.getItemsPrice(gameid, allourItems, function (data) { //Get all our items from the trade.
            debug(data);
            debug("Loaded Market Prices for us");
            for (var i in allourItems) {
              var ourinputData = data[i].lowest_price; //Checks the lowest price for the item
              if (ourinputData != undefined) { //If we get a response.
                var ourtostring = ourinputData.toString(); //Makes it to a string.
                var ourcurrentData = ourtostring.slice(1, 5); //Removes the '$' character.
                var ourparseData = parseFloat(ourcurrentData); //Makes it to a float
                ourprice += ourparseData; //Adds it to the price
                console.log("We offered ".green + data[i].name); //Shws what we offered in the console.
              } else {
                console.log('Someone tried to trade items from another game..');
              }
            }
            console.log('Our Value: '.blue + ourprice);
            if (ourprice <= theirprice) { //IF our value is smaller than their, if they are overpaying
              if (theirprice != 0 && ourprice != 0) { //If someone is actually offering something.
                var profitprice = theirprice - ourprice; //calculates the profit from the trade
                acceptOffer(offer, profitprice); //Accepts the offer
                sendStatus(ourprice, theirprice, profitprice, partner); //Goes to the function sendstatus and passes some final variables.
                fs.writeFile("./trades/" + offer.id + ".txt", 'Profit from trade: ' + profitprice + "\n" + 'New items: ' + allitems, function (err) { //Adds it into trades folder.
                  if (err) debug(err);
                  debug("Wrote trade to folder 'trades");
                });
              } else {
                declineOffer(offer); //Declines the offer
              }
            }
            else { //If we are overpaying.
              declineOffer(offer); //Declines the offer
            }
          });
        }
      });


    } else {
      console.log('\n');
      console.log('================= New Trade ===================='.green);
      console.log('The bot is now making calculations and checking \n prices, this step may take a while.');
      declineOffer(offer); //Declines the offer
    }
  }

}
manager.on('newOffer', (offer) => { //If we get a new offer
  debug("New offer recieved.");
  processOffer(offer); //Do the process function.
});
ipcMain.on('configGames', (event, data) => {
  let newgame = data.game;
  console.log(data);
  configjs.confighandler('game', newgame);
});
