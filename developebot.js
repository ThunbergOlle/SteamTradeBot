const market = require('steam-market-pricing');
/*var allourItems = ['Hot Mystery Box', 'Silver Augewehr'];
var ourprice = 0;
market.getItemsPrice(304930, allourItems, function(data){ //Get all our items from the trade.
  for (var i in allourItems){
    var ourinputData = data[allourItems[i]]['lowest_price']; //Checks the lowest price for the item
    var ourtostring = ourinputData.toString(); //Makes it to a string.
    var ourcurrentData = ourtostring.slice(1, 5); //Removes the '$' character.
    var ourparseData = parseFloat(ourcurrentData); //Makes it to a float
    ourprice += ourparseData; //Adds it to the price
    console.log("We offered ".green + allourItems[i]); //Shws what we offered in the console.
  }
});
*/
const ourItems = [
  {'name':'Tec-9 | Groundwater (Field-Tested)','price': '$0.05', 'tmp': 'name1' },
  {'name':'Gamma Case', 'price': '$0.08', 'tmp': 'name2' },
  {'name':'Gamma Case', 'price': '$0.08', 'tmp': 'name2' }
];

method = (array) => {
  let counts = [];
  for(let i = 0; i < array.length; i++){
    if(counts[array[i]] === undefined){
      counts[array[i]] = 1;
      console.log(counts);
    }else {
      console.log(counts[array]);
    }
  }
}
method(ourItems);