const readValue = require('../readvalue');
const debug = require('../debug');
const market = require('../steam-market-pricing');
const colors = require('colors'); //Requires colors.
const fs = require('fs');


//OFFER HANDLING
const acceptOffer = require('./acceptOffer');
const declineOffer = require('./declineOffer');
module.exports = async (offer, community) => {
    return new Promise(resolve => {
        let gameid, trash, ownerID;
        readValue.readValues((data) => {
            gameid = data.game;
            trash = data.trashlimit;
            ownerID = data.ownerID;
        });
        debug("Proccessing offer");
        if (offer.isGlitched() || offer.state === 11) { //IF THE offer was glitched
            console.log("The offer was glitched, declining".red);
            debug("Offer glitched");
            declineOffer(offer, "Offer Clitched"); //DECLINES OFFER
            resolve();
  
        }
          else if (offer.partner.getSteamID64() === ownerID) { //If the owner is withdrawing items from the bot.
            console.log("Trade partner is owner");
            debug("Trade partner is owner");
            acceptOffer(offer).then(() => debug("Accepted the offer with the owner")); //Accepts offer
            resolve();

        }
        else {
    
            partner = offer.partner.getSteamID64(); //Gets the partners steam64 id,
            theirprice = 0; //Tmp
            ourprice = 0;//Tmp
            ourItems = offer.itemsToGive; //All of our items
            theirItems = offer.itemsToReceive; //All of the trade partners items
            ourValue = 0; //Our items in a value
            theirValue = 0; //Their items in a value
        
            allitems = []; //Sets up a new array with all their items in.
            allourItems = []; //Sets up a new array with all our items in.
            debug("Variables setup for trade");
            for (let i in theirItems) { //For each in "theirItems"
              allitems.push(theirItems[i].market_hash_name); //Pushes each into an array.
            }
            debug("Their items are: " + allitems);
            for (let i in ourItems) { //For each in "ourItems"
              allourItems.push(ourItems[i].market_hash_name); //Pushes each into an array.
            }
            debug("Our items are: " + allourItems);
        
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
                for (let i in allitems) {
        
                  if (data[i] !== undefined) { //If we actually get a response continue the script...
                    let inputData = data[i].lowest_price;
                    let tostring = inputData.toString(); //Gets the data and converts it into a string.
                    let currentData = tostring.slice(1, 5); //Removes part of the string.
                    let parseData = parseFloat(currentData); //Sends it back to a float value.
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
                  resolve();

                } else {
                  market.getItemsPrice(gameid, allourItems, function (data) { //Get all our items from the trade.
                    debug(data);
                    debug("Loaded Market Prices for us");
                    for (let i in allourItems) {
                      if (data[i] != undefined) { //If we get a response.
                        let ourinputData = data[i].lowest_price; //Checks the lowest price for the item
                        let ourtostring = ourinputData.toString(); //Makes it to a string.
                        let ourcurrentData = ourtostring.slice(1, 5); //Removes the '$' character.
                        let ourparseData = parseFloat(ourcurrentData); //Makes it to a float
                        ourprice += ourparseData; //Adds it to the price
                        console.log("We offered ".green + data[i].name); //Shws what we offered in the console.
                      } else {
                        console.log('Someone tried to trade items from another game..');
                        debug("Someone tried to trade items from other games!");
                      }
                    }
                    console.log('Our Value: '.blue + ourprice);
                    if (ourprice <= theirprice) { //IF our value is smaller than their, if they are overpaying
                      if (theirprice != 0 && ourprice != 0) { //If someone is actually offering something.
                        let profitprice = theirprice - ourprice; //calculates the profit from the trade
                        acceptOffer(offer, profitprice).then(() => {
                          community.checkConfirmations(); //CHECKS FOR CONFIRMATIONS
                          sendStatus(ourprice, theirprice, profitprice, partner); //Goes to the function sendstatus and passes some final variables.
                          fs.writeFile("./trades/" + offer.id + ".txt", 'Profit from trade: ' + profitprice + "\n" + 'New items: ' + allitems, function (err) { //Adds it into trades folder.
                            if (err) debug(err);
                            debug("Wrote trade to folder 'trades");
                          });
                          resolve();

                        }).catch(err => debug(err)); //Accepts the offer
        
                      } else {
                        declineOffer(offer, "Theirprice and our Price are equal to 0"); //Declines the offer
                        resolve();

                    }
                    }
                    else { //If we are overpaying.
                      declineOffer(offer, "We are overpaying, ourprice <= theirprice"); //Declines the offer
                      resolve();

                    }
                  });
                }
              });
        
        
            } else {
              console.log('\n');
              console.log('================= New Trade ===================='.green);
              console.log('The bot is now making calculations and checking \n prices, this step may take a while.');
              declineOffer(offer, "Allitems.length is not bigger than 0"); //Declines the offer
              resolve();

            }
        }
    });
    
}