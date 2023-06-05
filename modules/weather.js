'use strict';
const axios = require('axios');

let cache = require('./cache.js');

async function getWeather(req, res, next) {
  let lat = req.query.lat;
  let long = req.query.lon;
  const key = 'weather-' + lat + long;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${long}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let result = await axios.get(url);

    try {
      cache[key].data = result.data;
      let cityData = cache[key].data;
      let dataToGroom = cityData.data;
      let dataToSend = dataToGroom.map(object => {
        return new Weather(object);
      });
      res.status(200).send(dataToSend);
    } catch (error) {
      next(error)
    }
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
    this.high = day.high_temp;
    this.low = day.low_temp;
  }
}

module.exports = getWeather;