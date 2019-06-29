//BOT DEVELOPED BY CLOUDIAN.
//PLEASE CONSIDER DONATING IF YOU FIND THIS BOT USEFULL.
//Youtube: https://www.youtube.com/channel/UCfh05PLfZXIEBGh-z4M6LyQ
//Thanks.
const market = require('./modules/steam-market-pricing');
const config = require('./config.json'); //This requires the config file.
const SteamTotp = require('steam-totp'); //Requires a module
const SteamUser = require('steam-user'); //Requires a module for login ect.
const SteamCommunity = require('steamcommunity'); //Requires a module for the steam communit
const TradeOfferManager = require('steam-tradeoffer-manager'); //Requires a module for handling trade offers.
const fs = require('fs');
const debug = require('./modules/debug.js');
const mainMenuTemplateModule = require('./modules/templates/template');
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
let ownerID = config.ownerID;
let gameid = config.game;
let trash = config.trashlimit; //Sets up the trash limit to a custom variable.d
const readValue = require('./modules/readvalue.js');
const offerStatusLog = require('./modules/offerStatuslog.js'); //For logging the status of the trade.


//Offer handling
const processOffer = require('./modules/offerHandling/processOffer')
// DECLARING VARIABLES FOR LATER USE
let partner, theirprice, ourprice, ourItems, theirItems,ourValue,theirValue, allitems, allourItems;



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
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplateModule); //Building the menu.
  //Insert menu into app.
  Menu.setApplicationMenu(mainMenu); //Sets menu template

});


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

sendStatus = (ourprice, theirprice, profit, partner) => {
  if (ourprice != undefined) { //Checking if the ourprice is not defined.
    win.webContents.send('accepted', {
      ourprice: ourprice,
      theirprice: theirprice,
      profit: profit,
      partner: partner
    });
  }
}


manager.on('newOffer', (offer) => { //If we get a new offer
  debug("New offer recieved.");
  processOffer(offer, community).then(() => {
    console.log("Resolved");
  }); //Do the process function.
});
ipcMain.on('configGames', (event, data) => {
  let newgame = data.game;
  console.log(data);
  configjs.confighandler('game', newgame);
});
