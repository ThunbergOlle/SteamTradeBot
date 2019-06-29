const debug = require('../debug');
const offerStatusLog = require('../offerStatuslog.js'); //For logging the status of the trade.
const saveTrade = require('../saveTrades.js');

module.exports = (offer, reason) => {
    debug(`Declined the offer, reason: ${reason}`);
    offer.decline(err => {
        if (err) debug(err);
        saveTrade(offer.partner.getSteamID64(), offer.id, null, null, null);
        offerStatusLog(false, 0);
    });
}