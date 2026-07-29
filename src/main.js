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
  // clickOnNavLink,
  pathObject,
  // drawMarkupFromPageName,
  searchedMoviesPage,
} from "./js/routingMarkup";

import {
  getGenresList,
  getImageConfiguration,
  getMoviesByTitle,
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
  // reloadRefs,
  sortingDropdownRef,
} from "./js/services/refs";
import { heroSectionMarkup } from "./js/components/hero";
import { mainPageInfoSectionMarkup } from "./js/components/mainPageInfo";
import {
  createDropdownMarkup,
  createGenreChipsListMarkup,
  sortingSectionMarkup,
} from "./js/components/sortingSection";
import { mainGallerySectionMarkup } from "./js/components/mainGallerySection";
import { paginationSectionMarkup } from "./js/components/pagination";

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

  const { searchQuery, page } = getUrlQueryInfo();
  console.log(searchQuery, page);

  if (!searchQuery) {
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
    changeTitleText(pathName);
    listenersReload();
    return;
  }

  if (searchQuery) {
    drawFetchedGalleryPage(page || 1, searchQuery);
  }
}

function getUrlQueryInfo() {
  let [searchQuery, ...params] = window.location.search.split("&");
  searchQuery = searchQuery.slice(1);
  let page = params.find((i) => i.slice(0, 5) === "page=")?.slice(5);
  page = page || 1;
  return { searchQuery, page };
}

const searchbarForm = document.querySelector(".searchbar-form");
searchbarForm.addEventListener("submit", onSearchFormSubmit);

function onSearchFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.currentTarget);
  const searchQuery = formData.get("search-field");

  if (searchQuery.trim() === "") {
    alert(
      "here should be notification for not searching empty string or whatever",
    );
    return;
  }

  drawFetchedGalleryPage(1, searchQuery);

  // main-gallery

  // go to movies page
  // header is search for [searchQuery]
  // changes to urlQuery ?

  // delay/check/empty value?
}

export function drawMarkupFromPageName(urlPath = document.URL) {
  const actualPath = window.location.pathname;

  const url = new URL(urlPath);

  const passedPath = url.pathname;

  const pathName = passedPath === "/" ? "home" : passedPath.slice(1);

  if (!pathObject[pathName]) return;
  console.log(pathObject[pathName]);

  // const { page, searchQuery } = getUrlQueryInfo();
  // console.log(searchQuery);

  let newURL =
    window.location.protocol +
    "//" +
    window.location.host +
    pathObject[pathName].path +
    url.search;

  window.history.pushState({ path: newURL }, "", newURL);

  if (!mainRef())
    root.insertAdjacentElement("afterbegin", document.createElement("main"));
  const main = mainRef();

  if (url.search !== "") {
    console.log("fetch page and draw");
    return;
  }
  if (actualPath !== passedPath || window.location.search === url.search) {
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
    changeTitleText(pathName);
  }
  listenersReload();
}

export function drawFetchedGalleryPage(page = 1, searchQuery) {
  getMoviesByTitle(page, searchQuery)
    .catch(console.log)
    .then((galleryData) => {
      let newURL =
        window.location.protocol +
        "//" +
        window.location.host +
        pathObject.movies.path +
        `?${searchQuery}&page=${page}`;

      drawMarkupFromPageName(newURL);

      const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);
      document.querySelector("main").innerHTML = galleryMarkup;
      listenersReload();

      // can be doubling code, need fix
    });
}

// console.log(searchbarForm);
