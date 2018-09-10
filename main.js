//BOT DEVELOPED BY CLOUDIAN.
//PLEASE CONSIDER DONATING IF YOU FIND THIS BOT USEFULL.
//Youtube: https://www.youtube.com/channel/UCfh05PLfZXIEBGh-z4M6LyQ
//Thanks.
const market = require('steam-market-pricing');
const config = require('./config.json'); //This requires the config file.
const SteamTotp = require('steam-totp'); //Requires a module
const SteamUser = require('steam-user'); //Requires a module for login ect.
const SteamCommunity = require('steamcommunity'); //Requires a module for the steam communit
const TradeOfferManager = require('steam-tradeoffer-manager'); //Requires a module for handling trade offers.
const socket = require('socket.io').listen(4000).sockets; //Requires socket.io and starts listening for new connections
const colors = require('colors'); //Requires colors.
const underscore = require('underscore');//Requires underscore
const readline = require('readline'); //Requires readline for editing config.json file
const electron = require('electron'); //Requires electron for the user interface and desktop app.
const configjs = require('./modules/config.js');//Loads a module called config.js inside modules folder.
const remote  = require('electron').remote; //Electrons
const {app, BrowserWindow, Menu} = electron; //Makes different variables that is equal to require electron.
const path = require('path'); //Module for path finding inside the project.
const url = require('url'); //Module for url.
let win; //Sets up temporary variable that will be set later in the script.
var gameid = config.game; //Sets up the gameid to a custom variable.
const trash = config.trashlimit; //Sets up the trash limit to a custom variable.d
const offerStatusLog = require('./modules/offerStatuslog.js'); //For logging the status of the trade.

const fs = require('fs'); //Requires fs that is going to act as the filesystem.
const client = new SteamUser(); //CREATES A NEW CLIENT FOR SteamTotp
const community = new SteamCommunity(); //Sets up new community.

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
  client.gamesPlayed(config.GameTitle); //DISPLAYS The games that it plays.
});
//Start when ready
app.on('ready', function(){ //When the app is ready.
  win = new BrowserWindow({width: 800, height: 600, icon:__dirname+'/img/bot.png', show: true}); //Initialized a new window.
  win.loadURL(url.format({ 
    pathname: path.join(__dirname +'/WebPage/index.html'), //Loading the URL.
    protocol: 'file',
    slashes: true
  }));

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
      label: 'Games',
      click: function(){ //This handles when the label is clicked.
          smallwin = new BrowserWindow({width: 350, height: 300});
          smallwin.loadURL(url.format({
          pathname: path.join(__dirname +'/WebPage/configs/configGames.html'),
          protocol: 'file',
          slashes: true,
  }));
  smallwin.setMenu(null);
      }
    },
    {
      label: 'Trashlimit',
      click: function(){//This handles when the label is clicked.
          smallwin = new BrowserWindow({width: 350, height: 300});
          smallwin.loadURL(url.format({
          pathname: path.join(__dirname +'/WebPage/configs/configTrash.html'),
          protocol: 'file',
          slashes: true
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
app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){ // if your system is other than MacOS (Thanks hartlomiej!)
      app.quit();//Quit the desktop app completely.
    }
});

//CHECKS For confirmations or offers to trade.
client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
    community.startConfirmationChecker(2000, config.identitySecret); 
});
socket.on('connection', function(socket){ //When we get a connection to the socket.
  
  function sendStatus(ourprice, theirprice, profit, partner){
    if(ourprice != undefined){ //Checking if the ourprice is not defined.
      socket.emit('accepted', { //Emits that it accepted the trade to the client.
        ourprice: ourprice,
        theirprice: theirprice,
        profit: profit,
        partner: partner
      });
    }
}

function acceptOffer(offer){ //Function for accepting an offer that someone has sent.
  offer.accept((err) => { //Accepts the offer
    community.checkConfirmations(); //CHECKS FOR CONFIRMATIONS
    if(err) console.log("Could not accept offer. There was an error".red); //If we get an error
  });
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

    var partner = offer.partner.getSteamID64(); //Gets the partners steam64 id,
    var theirprice = 0; //Tmp
    var ourprice = 0;//Tmp
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
    console.log('\n');
    console.log('================= New Trade ===================='.green);
    console.log('The bot is now making calculations and checking \n prices, this step may take a while.');
      for (var i in allitems){
        var inputData = data[allitems[i]]['lowest_price'];
        if(inputData != undefined){ //If we actually get a response continue the script...
        var tostring = inputData.toString(); //Gets the data and converts it into a string.
        var currentData = tostring.slice(1, 5); //Removes part of the string.
        var parseData = parseFloat(currentData); //Sends it back to a float value.
        if(parseData < trash){ //Checks if their item value is bigger than our limit. 
          parseData = 0.01; //Remove value of current item.
          theirprice += parseData;
          console.log("They offered a trash skin: ".red + allitems[i]); //Shows what they offered.
        }else {
        theirprice += parseData;
        console.log("They offered: ".red + allitems[i]); //Shows what they offered.
        }
        }else {
            console.log('Someone tried to trade items from another game..');
          }
      }
      console.log('Their Value: '.blue + theirprice);
      market.getItemsPrice(gameid, allourItems, function(data){ //Get all our items from the trade.
        for (var i in allourItems){
          var ourinputData = data[allourItems[i]]['lowest_price']; //Checks the lowest price for the item
          if(ourinputData != undefined) { //If we get a response.
          var ourtostring = ourinputData.toString(); //Makes it to a string.
          var ourcurrentData = ourtostring.slice(1, 5); //Removes the '$' character.
          var ourparseData = parseFloat(ourcurrentData); //Makes it to a float
          ourprice += ourparseData; //Adds it to the price
          console.log("We offered ".green + allourItems[i]); //Shws what we offered in the console.
          } else {
            console.log('Someone tried to trade items from another game..');
          }
        }
        console.log('Our Value: '.blue + ourprice);
        if (ourprice <= theirprice) { //IF our value is smaller than their, if they are overpaying
        if(theirprice != 0 && ourprice !=0){ //If someone is actually offering something.
        acceptOffer(offer); //Accepts the offer
        var profitprice = theirprice - ourprice; //calculates the profit from the trade
        offerStatusLog(true, profitprice);
        sendStatus(ourprice, theirprice, profitprice, partner); //Goes to the function sendstatus and passes some final variables.
        fs.writeFile("./trades/" + offer.id + ".txt", 'Profit from trade: ' + profitprice + "\n" + 'New items: ' + allitems, function (err){ //Adds it into trades folder.
          if (err) throw err;

        });
      }else {
        declineOffer(offer); //Declines the offer
        offerStatusLog(false, 0);
      }
    }
        else { //If we are overpaying.
        declineOffer(offer); //Declines the offer
        offerStatusLog(false, 0);
        }
      });
    });


  } else {
        declineOffer(offer); //Declines the offer
        offerStatusLog(false, 0);
  }
  }

}
manager.on('newOffer', (offer) => { //If we get a new offer
  processOffer(offer); //Do the process function.
});









//ALL SOCKETS THATS RECIEVING SOME KIND OF INFORMATION.

socket.on('configGames', function(data){ //If we get an imput from configGames socket.
  let newgame = data.game; //Sets up tmp variable.
  configjs.confighandler('game', newgame);//Sends over the information to another script to handle and deal with it.
});
socket.on('configTrash', function(data){//If we get an imput from configTrash socket.
  let newLimit = data.limit;//Sets up tmp variable.
  configjs.confighandler('trashlimit', newLimit);//Sends over the information to another script to handle and deal with it.
})
});