// 'use strict';
// const axios = require('axios');

// let cache = require('./cache.js');

// async function getMovies(req, res, next) {
//   let city = req.query.cityName;
//   const key = 'movies-' + city;
//   let movieURL = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&query=${city}`

//   if (cache[key]) {
//     console.log('movie cache hit');
//   } else {
//     console.log('movie Cache miss');
//     cache[key] = {};
//     cache[key].timestamp = Date.now();
//     let movieData = await axios.get(movieURL);

//     try {
//       cache[key].data = movieData.data.results;
//       let movieDataToSend = cache[key].data.map(object => {
//         return new Movies(object);
//       });
//       console.log('this is movieDataFetch: ', movieDataToSend)
//       res.status(200).send(movieDataToSend)
//     } catch (error) {
//       next(error)
//     }
//   }
// };

'use strict';
const axios = require('axios');
let cache = require('./cache.js');
async function getMovies(req, res, next) {
  let city = req.query.cityName;
  console.log('This is the city: ', city)
  const key = 'movies-' + city;
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  if (!cache[key]) {
    console.log('movie cache miss');
    cache[key] = {
      timestamp: Date.now(),
      data: await fetchMovies(movieURL)
    };
  }
  console.log('This is a Cache Key: ', cache[key].data)
  res.status(200).send(cache[key].data);
  return cache[key].data;
}
async function fetchMovies(url) {
  try {
    const response = await axios.get(url);
    const movies = response.data.results.map(movie => new Movie(movie));
    return movies;
  } catch (error) {
    throw error;
  }
}
class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.averageVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.releaseDate = movie.release_date;
  }
}
module.exports = getMovies;

// class Movies {
//   constructor(movie) {
//     this.title = movie.original_title;
//     this.overview = movie.overview;
//     this.averageVotes = movie.vote_average;
//     this.totalVotes = movie.vote_count;
//     this.image_url = movie.poster_path;
//     this.popularity = movie.popularity;
//     this.releaseDate = movie.release_date;
//   }
// }

// module.exports = getMovies;