'use strict';
const axios = require('axios');

async function handleGetWeather(req, res, next) {
  try {
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${request.query.lat}&lon=${request.query.lon}`
    let weatherData = await axios.get(url);

    let weatherMap = parseWeather(weatherData.data);
    weatherMap.then(weather => {
      res.status(200).send(weather);
    })
  } catch (error) {
    next(error);
  }
};

function parseWeather(weatherData) {
  try {
    const weatherSummary = weatherData.data.map(oneDay => {
      return new Forecast(oneDay);
    });
    return Promise.resolve(weatherSummary);
  } catch (error) {
    return Promise.reject(error);
  }
}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.high = day.high_temp;
    this.low = day.low_temp;
  }
}

module.exports = handleGetWeather;