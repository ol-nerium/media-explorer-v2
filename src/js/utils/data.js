import {
  getImageConfiguration,
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getTopRatedMoviesList,
  getUpcomingMoviesList,
} from "../services/apiService";
import { pathObject } from "../services/routing";
import { getFromLS } from "../services/localStorageService";

export const nowPlayingObj = await getNowPlayingMoviesList();
export const popularObj = await getPopularMoviesList();
export const topRatedObj = await getTopRatedMoviesList();
export const upcomingObj = await getUpcomingMoviesList();

export const configuration = await getImageConfiguration();
export const {
  base_url,
  secure_base_url,
  backdrop_sizes,
  logo_sizes,
  poster_sizes,
  profile_sizes,
  still_sizes,
} = configuration.images;

export const heroSliderData = nowPlayingObj.results.slice(0, 5);
export const lsKeys = {
  queue: "quequeFilmsList",
};

export const processSavedGalleryData = (pathName = "queue") => {
  const lsKey = lsKeys[pathName];
  const savedIdsList = () => getFromLS(lsKey) || [];
  const currentIdsList = savedIdsList();

  const pageLimit = 20;

  const total_results = currentIdsList.length;
  const total_pages = Math.ceil(total_results / pageLimit);
  const paginatedPagesIdsData = [];

  let pageData = [];
  for (let i = 0; i < total_results; i++) {
    pageData.push(currentIdsList[i]);

    if ((i + 1) % 20 === 0 && i !== 0) {
      paginatedPagesIdsData.push(pageData);
      pageData = [];
      continue;
    }

    if (i === total_results - 1) {
      paginatedPagesIdsData.push(pageData);
      pageData = [];
    }
  }

  return {
    idResults: paginatedPagesIdsData,
    total_pages,
    total_results,
  };
};

export const mainLinks = [
  pathObject.home,
  pathObject.movies,
  pathObject.genres,
  pathObject.popular,
  pathObject.toprated,
  pathObject.upcoming,
].filter((i) => i);
export const libraryLinks = [pathObject.favorites, pathObject.queue].filter(
  (i) => i,
);
export const settingsLinks = [pathObject.settings, pathObject.logout].filter(
  (i) => i,
);
