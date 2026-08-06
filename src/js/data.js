import {
  fetchResultsByIds,
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getTopRatedMoviesList,
  getUpcomingMoviesList,
} from "./services/apiService";
import { getFromLS } from "./utils/localStorage";

export const nowPlayingObj = await getNowPlayingMoviesList();
export const popularObj = await getPopularMoviesList();
export const topRatedObj = await getTopRatedMoviesList();
export const upcomingObj = await getUpcomingMoviesList();

// console.log(getFromLS("quequeFilmsList"));
const quequeObjPromise = await fetchResultsByIds(
  getFromLS("quequeFilmsList") || [],
);
export const quequeObj = await quequeObjPromise;

export const heroSliderData = nowPlayingObj.results.slice(0, 5);
