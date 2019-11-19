const request = require('request');

const geoCoding = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZG9sYXBvIiwiYSI6ImNrMmFkOG03ZzAxYWczb3A0d2xhNHV4ZmIifQ.YZhUmcX-iR0yykbu9uGVcg&limit=1`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to GeoCoding Server :(', undefined);
        } else if(body.features.length === 0) {
            callback('No result found :(');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geoCoding;