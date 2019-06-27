const debug = require('../debug');
const offerStatusLog = require('../offerStatuslog.js'); //For logging the status of the trade.

module.exports = (offer, profit) => {
    return new Promise((reject, resolve) => {
        debug(`Trying to accept the offer`);
        //offer.accept((err) => {
            //if(err) debug (err);
            offerStatusLog(true, profit);
            debug(`Accepted the offer, resolving... (err = ${err})`);
            resolve();
        //})
    });
}