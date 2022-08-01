const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3953403fd59f31204f77f3b99606e80a&query=" +
    latitude +
    "," +
    longitude +
    "&unites=f";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (response.body.error) {
      callback("Error", undefined);
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        precipitaion: response.body.current.precip,
      });
    }
  });
};

module.exports = forecast;
