const debug = require('../debug');
const offerStatusLog = require('../offerStatuslog.js'); //For logging the status of the trade.

module.exports = (offer, reason) => {
    debug(`Declined the offer, reason: ${reason}`);
    offer.decline(err => {
        if (err) debug(err);
        offerStatusLog(false, 0);
    });
}