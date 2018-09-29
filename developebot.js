const market = require('./modules/steam-market-pricing');
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
let items = [
  'Tec-9 | Groundwater (Field-Tested)',
  'Gamma Case',
  'Gamma Case'
]
market.getItemsPrice(730, items, (data) => {
  // console.log(data);
})


let ourItems = [
  { 'name': 'Tec-9 | Groundwater (Field-Tested)', 'price': '$0.05', 'tmp': 'name1' },
  { 'name': 'Gamma Case', 'price': '$0.08', 'tmp': 'name2' },
  { 'name': 'Gamma Case', 'price': '$0.08', 'tmp': 'name2' }

];

// for (var i = 0; i < ourItems.length; i++) {
//   if (ourItems[i] !== undefined) {
//     ourItems[i].count = + 1;
//     for (let x = 0; x < ourItems.length; x++) {
//       if (i !== x && ourItems[i].name === ourItems[x].name) {
//         ourItems[i].count = ourItems[i].count + 1;
//         delete ourItems[x];
//       }
//     }
//   }
// }
// console.log(ourItems);