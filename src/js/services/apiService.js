import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

function getGenresList() {
  // Get the list of official genres for movies.
  return axios.get("genre/movie/list").then((res) => res.data);
}

function getMoviesByGenre(
  page = 1,
  genreIdArr,
  sortBy = "popularity",
  order = "desc",
) {
  // with_genres
  const with_genres = genreIdArr.join(",");
  return axios
    .get(
      `discover/movie?&page=${page}&sort_by=${sortBy}.${order}&with_genres=${with_genres}`,
    )
    .then((res) => res.data);
}

// MOVIE LISTS:
function getNowPlayingMoviesList(page = 1, _) {
  // page, region, lang = "en-US"
  return axios
    .get(`movie/now_playing?language=en-US&page=${page}`)
    .then((res) => res.data);
  // Get a list of movies that are currently in theatres.
}
function getPopularMoviesList(page = 1, _) {
  // lang = "en-US",  region
  return axios
    .get(`movie/popular?language=en-US&page=${page}`)
    .then((res) => res.data);
  // Get a list of movies ordered by popularity.
}
function getTopRatedMoviesList(page = 1, _) {
  // (lang = "en-US"), region;
  return axios
    .get(`movie/top_rated?language=en-US&page=${page}`)
    .then((res) => res.data);
  // Get a list of movies ordered by rating.
}
function getUpcomingMoviesList(page = 1, _) {
  // (lang = "en-US"), region;
  return axios
    .get(`movie/upcoming?language=en-US&page=${page}`)
    .then((res) => res.data);
  // Get a list of movies that are being released soon.
}

function getMovieById(movie_id) {
  // Get the top level details of a movie by ID.
  return axios
    .get(`movie/${movie_id}`)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
}

export function getSimilarMoviesById(page = 1, movie_id) {
  // Get the similar movies based on genres and keywords.
  // ?language=en-US&page=1
  return axios
    .get(`movie/${movie_id}/similar?page=${page}`)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
}
export function getReviewsByFilmId(movie_id) {
  // Get the user reviews for a movie.
  return axios
    .get(`movie/${movie_id}/reviews`)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
}
export function getCreditsByFilmId(movie_id) {
  // directing, art, acting etc.
  return axios
    .get(`movie/${movie_id}/credits`)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
}

function getKeywordIdByTitle(query, page) {
  // Search for keywords by their name.
  return axios
    .get(`search/keyword?query=${query}&page=${page}`)
    .then((res) => res.data);
}

function getMoviesByTitle(page = 1, query) {
  // query required
  // include_adult boolean
  // language  Defaults to en-US
  // primary_release_year
  // page
  // region
  // year
  return axios
    .get(
      `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    )
    .then((res) => res.data);
}

function fetchResultsByIds(idsArr) {
  const fetchArray = idsArr.map((item) => getMovieById(item));
  return Promise.allSettled(fetchArray);
}

function getExternalFilmVideosById(movie_id) {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${movie_id}/videos`)
    .then((res) => res.data);
}

function getImageConfiguration() {
  return axios
    .get("https://api.themoviedb.org/3/configuration")
    .then((res) => res.data);
}

export {
  getGenresList,
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getTopRatedMoviesList,
  getUpcomingMoviesList,
  getMovieById,
  getKeywordIdByTitle,
  getMoviesByTitle,
  fetchResultsByIds,
  getExternalFilmVideosById,
  getMoviesByGenre,
  getImageConfiguration,
};
