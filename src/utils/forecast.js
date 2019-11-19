const request = require('request');


const foreCast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/085d3c55ee77cc72742035e5ae0be384/${latitude},${longitude}?lang=en`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the server :(', undefined);
        } else if(body.error) {
            callback('Location not found :(', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out, There is ${body.currently.precipProbability}% chance of rain`);
        }
    });

}

module.exports = foreCast;
