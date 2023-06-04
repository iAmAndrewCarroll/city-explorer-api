// Building an Express Server
'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const handleGetWeather = require('./modules/weather');
const handleGetMovies = require('./modules/movie');

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.status(200).send('this server is working overtime');
});

// this creates the API endpoint localhost:3001/weather
// (request, response) is required
app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);

app.get('*', (req, res) => {
  res.send('Stop touching me...');
});

app.use((error, req, res, next) => {
  console.log(error.message)
  res.status(500).send(error.message)
});

// async function getWeather(request, response) {
//   const { cityName, lat, lon } = request.query;
//   console.log(lat, lon);
//   const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
//   console.log('this is the url', url);
//   try {
//     const weatherResponse = await axios.get(url);
//     const weatherData = weatherResponse.data;
//     const weatherArray = weatherData.data.map(day => new Forecast(day));
//     console.log('this is the weatherArray', weatherArray);
//     response.status(200).send(weatherArray);
//   } catch (error) {
//     errorHandler(error, response);
//   }
// }

// app.get('/movies', getMovies);

// async function getMovies(request, response) {
//   const { cityName } = request.query;
//   console.log(cityName);
//   let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&page=1`;
//   console.log('this is the url', url);
//   try {
//     const moviesResponse = await axios.get(url);
//     const movieData = moviesResponse.data;
//     const movieArray = movieData.results.map(movie => new Movie(movie));
//     console.log('this is the movieArray', movieArray);
//     response.status(200).send(movieArray);
//   } catch (error) {
//     errorHandler(error, response);
//   }
// }

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

// function Forecast(day) {
//   this.date = day.valid_date;
//   this.description = day.weather.description;
// }

// function Movie(movie) {
//   this.title = movie.original_title;
//   this.overview = movie.overview;
//   this.averageVotes = movie.vote_average;
//   this.totalVotes = movie.vote_count;
//   this.image_url = movie.poster_path;
//   this.popularity = movie.popularity;
//   this.releaseDate = movie.release_date;
// }

// console.log(Movie.overview)

// function errorHandler(error, response) {
//   console.log(error);
//   response.status(500).send('Error Error Error');

// }

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
