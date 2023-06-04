'use strict';
const axios = require('axios');

async function handleGetMovies(req, res, next) {
  try {
    console.log('req query here: ', req.query);
    let city = req.query.cityName;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
    let movieData = await axios.get(movieURL);

    let movieMap = parseMovies(movieData.data.results);
    console.log('These be movies: ', movieMap);
    movieMap.then(movie => {
      res.status(200).send(movie);
    })

  } catch (error) {
    console.log('This is the error: ', error);
    next(error)
  }
};

function parseMovies(movieData) {
  try {
    const movieSummary = moviesData.map(oneMovie => {
      return new Movies(oneMovie);
    });
    return Promise.resolve(movieSummary);
  } catch (error) {
    return Promise.reject(error);
  }
}

class Movies {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.averageVotes - movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.image_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.releaseDate = movie.release_date;
  }
}