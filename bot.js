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
const colors = require('colors');

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
console.log('Verision 1.0'.cyan);
console.log('Open sourcecode'.cyan);
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
  client.setPersona(SteamUser.Steam.EPersonaState.Online); //Shows that the bot is online.
  client.gamesPlayed("Bot"); //DISPLAYS The games that it plays.
});

//CHECKS For confirmations or offers to trade.
client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
    community.startConfirmationChecker(2000, config.identitySecret);
});

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
    console.log('\n');
    console.log('================= New Trade ===================='.green);
    console.log('The bot is now making calculations and checking prices, this step may take a while.');
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

    market.getItemsPrice(730, allitems, function(data){

      for (var i in allitems){
        var inputData = data[allitems[i]]['lowest_price'];
        var tostring = inputData.toString();
        var currentData = tostring.slice(1, 5);
        var parseData = parseFloat(currentData);
        theirprice += parseData;
        console.log("They offered: ".red + allitems[i]); //Shows what they offered.
      }
      console.log('Their Value: '.blue + theirprice);
      market.getItemsPrice(730, allourItems, function(data){ //Get all our items from the trade.
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
        fs.writeFile("./trades/" + offer.id + ".txt", 'Profit from trade: ' + profitprice + "\n", function (err){
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


  }

}

manager.on('newOffer', (offer) => { //If we get a new offer
  processOffer(offer); //Do the process function.

});
