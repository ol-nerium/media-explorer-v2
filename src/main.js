import "./style.css";
import { headerMarkup } from "./js/components/header";

import {
  homePage,
  moviesPage,
  genresPage,
  watchlistPage,
  historyPage,
  favoritesPage,
  queuePage,
  // firstLoad,
  clickOnNavLink,
  pathObject,
  drawMarkupFromPageName,
} from "./js/routingMarkup";

import {
  getGenresList,
  getImageConfiguration,
  getNowPlayingMoviesList,
  getPopularMoviesList,
} from "./js/services/apiService";
import { changeTitleText } from "./js/utils";

import {
  listenersReload,
  appRootRef,
  genresChipsRootRef,
  headerRootRef,
  mainRef,
  mobileLayoutRef,
  refs,
  reloadRefs,
  sortingDropdownRef,
} from "./js/services/refs";
import { heroSectionMarkup } from "./js/components/hero";

export const nowPlayingObj = await getNowPlayingMoviesList();
export const popularObj = await getPopularMoviesList(20);
// export const topRatedObj = await getTopRatedMoviesList();
// export const upcomingObj = await getUpcomingMoviesList();

export const heroSliderData = nowPlayingObj.results.slice(0, 5);

const root = appRootRef("app");

firstLoad();

export function firstLoad() {
  const actualPath = window.location.pathname;

  let pathName = actualPath === "/" ? "home" : actualPath.slice(1);

  if (!pathObject[pathName]) {
    let newURL = window.location.protocol + "//" + window.location.host + "/";
    window.history.pushState({ path: newURL }, "", newURL);
    pathName = "home";
  }
  if (!mainRef())
    root.insertAdjacentElement("afterbegin", document.createElement("main"));
  const main = mainRef();

  root.insertAdjacentHTML("afterbegin", headerMarkup());
  main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());

  changeTitleText(pathName);
  listenersReload();
}

// const mobileGenres = document.querySelector(".mobile-genres-list");
// mobileGenres.addEventListener("click", (evt) => {
//   console.log(evt.target);
// });

// const gallerySlider = document.querySelector(".gallery-list-slider");

// gallerySlider.addEventListener("click", (evt) => {
//   // there will be a few galleries, so they will need additional classes on the section parent
//   console.log(evt.target);
// });
