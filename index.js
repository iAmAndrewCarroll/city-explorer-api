// Building an Express Server
'use strict';
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const weather = require('./data/weather.json');

// this is the 'actual server' and line 12 invokes it
const app = express();

// invoke cors
app.use(cors());

// this creates localhost:3001
const PORT = process.env.PORT || 3001;

// this creates the API endpoint localhost:3001/weather
// (request, response) is required
app.get('/weather', getWeather);

function getWeather(request, response) {
  const { cityName } = request.query;
  const cityWeather = weather.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());
  try {
    const weatherArray = cityWeather.data.map(day => new Forecast(day));
    console.log('this is the weatherArray', weatherArray);
    response.status(200).send(weatherArray);
  } catch (error) {
      errorHandler(error, response)
  }
}

function Forecast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;
}

function errorHandler(error, response) {
  console.log(error);
  response.status(500).send('Error Error Error');

}

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
