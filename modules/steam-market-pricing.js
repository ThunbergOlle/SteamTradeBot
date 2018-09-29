var request = require('request');

/**
 * Retrieve price for single item.
 *
 * @param {number} appid - Steam application id
 * @param {String} name - Item name, market hashed
 * @param {Function} callback - Callback function(err, data)
 * @param {number} [currency=1] - Currency code number, default USD (https://github.com/SteamRE/SteamKit/blob/master/Resources/SteamLanguage/enums.steamd#L696)
 */
exports.getItemPrice = function(appid, name, callback, currency) {
    if (typeof callback !== 'function') {
        throw new Error('No callback supplied');
    }

    if (typeof currency !== 'number') {
        currency = 1;
    }

    request({
        uri: '/market/priceoverview',
        baseUrl: 'http://steamcommunity.com/',
        json: true,
        qs: {
            currency: currency,
            appid: appid,
            market_hash_name: name
        }
    }, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            body.market_hash_name = name;
            callback(null, body);
        } else {
            callback(err);
        }
    });
};


/**
 * Retrieve price for list of items.
 *
 * @param {number} appid - Steam application id
 * @param {Object} names - Item name, market hashed
 * @param {Function} callback - Callback function(err, data)
 * @param {number} [currency=1] - Currency code number, default USD (https://github.com/SteamRE/SteamKit/blob/master/Resources/SteamLanguage/enums.steamd#L696)
 */
exports.getItemsPrice = function(appid, names, callback, currency) {
    if (typeof callback !== 'function') {
        throw new Error('No callback supplied');
    }

    if (typeof currency !== 'number') {
        currency = 1;
    }

    if (typeof names !== 'object') {
        if (typeof names === 'string') {
            names = [names];
        } else {
            throw new Error('Non-object supplied');
        }
    }

    var result = {};

    names.forEach(function(name, index, names) {
        request({
            uri: '/market/priceoverview',
            baseUrl: 'http://steamcommunity.com/',
            json: true,
            qs: {
                currency: currency,
                appid: appid,
                market_hash_name: name
            }
        }, function(err, response, body) {
            if (!err && response.statusCode === 200) {
                body.id = Math.floor(Math.random() * 255);
                body.name=name;
                result[index] = body;
            } else {
                result[name] = {'success': false};
            }
            if(index === names.length - 1){
                back = () => {
                    callback(result);
                }
                setTimeout(back, 200);
            }
        });
    });
};