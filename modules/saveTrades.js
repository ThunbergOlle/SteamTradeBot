const debug = require('./debug');
const fs = require('fs');
module.exports = async (partner, offerid, profit, lostItems, gainedItems) => {
    //CONSTRUCT THE JSON FILE
    let json = {
        partner: partner,
        profit: profit,
        lostItems: lostItems,
        gainedItems: gainedItems
    }
    json = JSON.stringify(json);
    fs.writeFile(`./trades/${offerid}.json`, json, err => debug(err));
}