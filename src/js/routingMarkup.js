import { mainPageInfoSectionMarkup } from "./components/mainPageInfo";
import { sortingSectionMarkup } from "./components/sortingSection";
import { heroSectionMarkup } from "./components/hero";
import { mobileGenresSectionMarkup } from "./components/mobileGenresSection";
import { sliderGallerySectionMarkup } from "./components/sliderGallery";
import { mainGallerySectionMarkup } from "./components/mainGallerySection";
import { genresSectionMarkup } from "./components/genresSection";
import { savedGalleryMarkup } from "./components/savedGallery";
import { paginationSectionMarkup } from "./components/pagination";
import { tabletHomeSectionMarkup } from "./components/tabletHomeSection";

import { heroSliderData, nowPlayingObj, popularObj } from "../main";
import { changeTitleText } from "./utils";
import { listenersReload, appRootRef, mainRef } from "./services/refs";

const root = appRootRef();

const homePage = () => {
  return (
    heroSectionMarkup(heroSliderData) +
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

//

export const pathObject = {
  home: { path: "/", func: homePage },
  movies: { path: "/movies", func: moviesPage },
  genres: { path: "/genres", func: genresPage },
  watchlist: { path: "/watchlist", func: watchlistPage },
  history: { path: "/history", func: historyPage },
  favorites: { path: "/favorites", func: favoritesPage },
  queue: { path: "/queue", func: queuePage },
  settings: {
    path: "/settings",
    func: () => {
      console.log("here could be settings page");
    },
  },
  logout: {
    path: "/logout",
    func: () => {
      console.log("here could be logout");
    },
  },
};

export function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt.target.closest("a");
  if (!link) return;

  drawMarkupFromPageName(link.href);
}

export function drawMarkupFromPageName(urlPath = document.URL) {
  const actualPath = window.location.pathname;

  const url = new URL(urlPath);
  const passedPath = url.pathname;

  const pathName = passedPath === "/" ? "home" : passedPath.slice(1);

  if (!pathObject[pathName]) return;

  let newURL =
    window.location.protocol +
    "//" +
    window.location.host +
    pathObject[pathName].path;

  window.history.pushState({ path: newURL }, "", newURL);

  if (!mainRef())
    root.insertAdjacentElement("afterbegin", document.createElement("main"));
  const main = mainRef();

  if (!(actualPath === passedPath)) {
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
    changeTitleText(pathName);
  }
  listenersReload();
}

export {
  homePage,
  moviesPage,
  genresPage,
  watchlistPage,
  historyPage,
  favoritesPage,
  queuePage,
};
