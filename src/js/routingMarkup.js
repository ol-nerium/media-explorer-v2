import { mainPageInfoSectionMarkup } from "./components/mainPageInfo";
import {
  createDropdownMarkup,
  createGenreChipsListMarkup,
  sortingSectionMarkup,
} from "./components/sortingSection";
import { heroSectionMarkup } from "./components/hero";
import { mobileGenresSectionMarkup } from "./components/mobileGenresSection";
import { sliderGallerySectionMarkup } from "./components/sliderGallery";
import { mainGallerySectionMarkup } from "./components/mainGallerySection";
import { genresSectionMarkup } from "./components/genresSection";
import { savedGalleryMarkup } from "./components/savedGallery";
import { paginationSectionMarkup } from "./components/pagination";

import { heroSliderData, popularObj, topRatedObj, upcomingObj } from "./data";

const gallerySliderSectionsTitles = {
  POPULAR: "popular",
  TOPRATED: "top rated",
  UPCOMING: "upcoming",
};

const homePage = () => {
  return (
    heroSectionMarkup(heroSliderData) +
    mobileGenresSectionMarkup() +
    sliderGallerySectionMarkup(
      gallerySliderSectionsTitles.POPULAR,
      popularObj.results,
    ) +
    sliderGallerySectionMarkup(
      gallerySliderSectionsTitles.TOPRATED,
      topRatedObj.results,
    ) +
    sliderGallerySectionMarkup(
      gallerySliderSectionsTitles.UPCOMING,
      upcomingObj.results,
    )

    //+ tabletHomeSectionMarkup()
  );
};

const moviesPage = (title = "Popular", galleryData = popularObj) => {
  return (
    mainPageInfoSectionMarkup() +
    sortingSectionMarkup(createGenreChipsListMarkup(), createDropdownMarkup()) +
    mainGallerySectionMarkup(title, galleryData.results) +
    paginationSectionMarkup(galleryData)
  );
};

export const searchedMoviesPage = (
  searchQuery = "Default",
  galleryData = [],
) => {
  return (
    mainPageInfoSectionMarkup(searchQuery) +
    sortingSectionMarkup(createGenreChipsListMarkup()) +
    mainGallerySectionMarkup("search for " + searchQuery, galleryData.results) +
    paginationSectionMarkup(galleryData)
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

export const pathObject = {
  home: { path: "/", name: "home", func: homePage },
  movies: { path: "/movies", name: "movies", func: moviesPage },

  genres: { path: "/genres", name: "genres", func: genresPage },
  popular: { path: "/popular", name: "popular", func: moviesPage },
  toprated: { path: "/toprated", name: "top rated", func: moviesPage },
  upcoming: { path: "/upcoming", name: "upcoming", func: moviesPage },

  // watchlist: { path: "/watchlist", func: watchlistPage },
  // history: { path: "/history", func: historyPage },
  favorites: { path: "/favorites", name: "favorites", func: favoritesPage },
  queue: { path: "/queue", name: "queue", func: queuePage },

  settings: {
    // path: "/settings",
    path: "/",
    name: "settings",
    func: settingsPage,
  },

  logout: {
    // path: "/logout",
    path: "/",
    name: "logout",
    func: logoutPage,
  },
};
