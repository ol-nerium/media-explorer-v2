import {
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getTopRatedMoviesList,
  getUpcomingMoviesList,
} from "./services/apiService";

export const nowPlayingObj = await getNowPlayingMoviesList();
export const popularObj = await getPopularMoviesList(20);
export const topRatedObj = await getTopRatedMoviesList();
export const upcomingObj = await getUpcomingMoviesList();

export const heroSliderData = nowPlayingObj.results.slice(0, 5);
