import {
  headerMarkup,
  mainPageInfoSectionMarkup,
  sortingSectionMarkup,
  heroSectionMarkup,
  mobileGenresSectionMarkup,
  sliderGallerySectionMarkup,
  mainGallerySectionMarkup,
  genresSectionMarkup,
  savedGalleryMarkup,
  paginationSectionMarkup,
  tabletHomeSectionMarkup,
} from "./sectionCreate";
import {
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getTopRatedMoviesList,
  getUpcomingMoviesList,
} from "./services/apiService";

const nowPlayingObj = await getNowPlayingMoviesList();
const popularObj = await getPopularMoviesList(20);
const topRatedObj = await getTopRatedMoviesList();
const upcomingObj = await getUpcomingMoviesList();

const homePage = () => {
  return (
    heroSectionMarkup(nowPlayingObj.results) +
    mobileGenresSectionMarkup() +
    sliderGallerySectionMarkup("popular", popularObj.results) +
    tabletHomeSectionMarkup()
  );
};

const moviesPage = () => {
  return (
    mainPageInfoSectionMarkup() +
    sortingSectionMarkup() +
    mainGallerySectionMarkup("popular", popularObj.results) +
    paginationSectionMarkup(popularObj)
  );
};

const genresPage = () => {
  return mainPageInfoSectionMarkup() + genresSectionMarkup();
};

const watchlistPage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup(popularObj.results);
};

const historyPage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup(popularObj.results);
};
const favoritesPage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup(popularObj.results);
};
const queuePage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup(popularObj.results);
};
const settingsPage = () => {};
const logoutPage = () => {};

export {
  homePage,
  moviesPage,
  genresPage,
  watchlistPage,
  historyPage,
  favoritesPage,
  queuePage,
};
