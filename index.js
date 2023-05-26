// Building an Express Server
'use strict';
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const axios = require('axios');

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

async function getWeather(request, response) {
  const { cityName, lat, lon } = request.query;
  console.log(lat, lon);
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`;
  console.log('this is the url', url);
  try {
    const weatherResponse = await axios.get(url);
    const weatherData = weatherResponse.data;
    const weatherArray = weatherData.data.map(day => new Forecast(day));
    console.log('this is the weatherArray', weatherArray);
    response.status(200).send(weatherArray);
  } catch (error) {
    errorHandler(error, response);
  }
}

app.get('/movies', getMovies);

async function getMovies(request, response) {
  const { cityName } = request.query;
  console.log(cityName);
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&page=1`;
  console.log('this is the url', url);
  try {
    const moviesResponse = await axios.get(url);
    const movieData = moviesResponse.data;
    const movieArray = movieData.results.map(movie => new Movie(movie));
    console.log('this is the movieArray', movieArray);
    response.status(200).send(movieArray);
  } catch (error) {
    errorHandler(error, response);
  }
}

// function getWeather(request, response) {
//   const { cityName, lat, lon } = request.query;
//   console.log(lat, lon);
//   const cityWeather = weather.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());
//   const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`;
//   console.log('this is the url', url.data);
//   try {
//     const weatherArray = cityWeather.data.map(day => new Forecast(day));
//     console.log('this is the weatherArray', weatherArray);
//     response.status(200).send(weatherArray);
//   } catch (error) {
//     errorHandler(error, response);
//   }
// }

function Forecast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;
}

function Movie(movie) {
  this.title = movie.original_title;
  this.overview = movie.overview;
  this.averageVotes = movie.vote_average;
  this.totalVotes = movie.vote_count;
  this.image_url = movie.poster_path;
  this.popularity = movie.popularity;
  this.releaseDate = movie.release_date;
}

console.log(Movie.overview)

function errorHandler(error, response) {
  console.log(error);
  response.status(500).send('Error Error Error');

}

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
