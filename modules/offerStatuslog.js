module.exports = (status, profit) => {
// FALSE = NOT ACCEPTED
// TRUE = ACCEPTED
// This file is for writing the logs if an offer is accepted or not.
    if(status === true){
        console.log('Accepted with profit: '.green + profit); //Logs the profit made by the trade
        console.log('================================================'.green);
    } else {
        console.log('Declined the offer.'.red); //Logs that it's declines the offer
        console.log('================================================'.green);
    }

}