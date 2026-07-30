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
  getCreditsByFilmId,
  getGenresList,
  getImageConfiguration,
  getMovieById,
  getMoviesByTitle,
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getReviewsByFilmId,
  getSimilarMoviesById,
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
import { fullCardMarkup } from "./js/components/fullCard";

export const nowPlayingObj = await getNowPlayingMoviesList();
export const popularObj = await getPopularMoviesList(20);
// export const topRatedObj = await getTopRatedMoviesList();
// export const upcomingObj = await getUpcomingMoviesList();

export const heroSliderData = nowPlayingObj.results.slice(0, 5);

const root = appRootRef("app");
if (!mainRef())
  root.insertAdjacentElement("afterbegin", document.createElement("main"));
root.insertAdjacentHTML("afterbegin", headerMarkup());

const main = mainRef();
// firstLoad();
drawMarkupFromPageURL();

// export function firstLoad() {
//   const actualPath = window.location.pathname;
//   let pathName = actualPath === "/" ? "home" : actualPath.slice(1);

// if (!pathObject[pathName]) {
//   let newURL = window.location.protocol + "//" + window.location.host + "/";
//   window.history.pushState({ path: newURL }, "", newURL);
//   pathName = "home";
// }

// const { searchQuery, page } = getUrlInfo();

// if (!searchQuery) {
//   main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
//   changeTitleText(pathName);
//   listenersReload();
//   return;
// }

// if (searchQuery) {
//   drawFetchedGalleryPage(page || 1, searchQuery);
// }
// }

export function drawMarkupFromPageURL(targetURL = document.URL) {
  const actualPath = window.location.pathname;

  const targetLocation = new URL(targetURL);
  const targetPath = targetLocation.pathname;

  let pathName = targetPath === "/" ? "home" : targetPath.slice(1);
  if (!pathObject[pathName]) {
    pathName = "home";
    setUrlInfo({ pathName });
    // here can be usage of setFilmCardUrlInfo and return
  }
  if (!targetLocation.search) {
    setUrlInfo({ pathName });
  }

  const { searchQuery, page } = getUrlInfo();
  if (
    actualPath !== targetPath
    // ?
    //page
  ) {
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
    changeTitleText(pathName);
    listenersReload();
    setUrlInfo({ searchQuery: null, page: null, pathName });
    return;
  }

  if (!searchQuery) {
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
    changeTitleText(pathName);
    setUrlInfo({ searchQuery, page, pathName });
    listenersReload();
    return;
  } else {
    drawFetchedGalleryPage(page || 1, searchQuery);
    setUrlInfo({ searchQuery: searchQuery, page: page, pathName: "movies" });
    listenersReload();
  }
}

function getUrlInfo() {
  if (!window.location.search) {
    return { searchQuery: "", page: null };
  }
  let [searchQuery, ...params] = window.location.search.split("&");

  searchQuery = searchQuery.slice(1);
  let page = params?.find((i) => i.slice(0, 5) === "page=")?.slice(5);

  if (!page || isNaN(page) || page < 1) page = 1;
  return { searchQuery, page };
}

export function setUrlInfo({ pathName, searchQuery = "", page = 1 }) {
  let newURL;
  if (!searchQuery) {
    newURL =
      window.location.protocol +
      "//" +
      window.location.host +
      pathObject[pathName].path;
  } else {
    newURL =
      window.location.protocol +
      "//" +
      window.location.host +
      pathObject[pathName].path +
      `?${searchQuery}&page=${page}`;
  }

  window.history.pushState({ path: newURL }, "", newURL);
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

  // delay/check/empty value?
}

export function drawFetchedGalleryPage(page = 1, searchQuery) {
  getMoviesByTitle(page, searchQuery)
    .catch(console.log)
    .then((galleryData) => {
      // let newURL =
      //   window.location.protocol +
      //   "//" +
      //   window.location.host +
      //   pathObject.movies.path +
      //   `?${searchQuery}&page=${page}`;

      // drawMarkupFromPageName(newURL);
      setUrlInfo({ pathName: "movies", searchQuery, page });

      const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);
      document.querySelector("main").innerHTML = galleryMarkup;
      listenersReload();

      // can be doubling code, need fix
    });
}

export function renderFilmCard(filmId) {
  if (!filmId) {
    console.log("no film id");
    return;
  }

  Promise.all([
    getMovieById(filmId),
    getCreditsByFilmId(filmId),
    getReviewsByFilmId(filmId),
    getSimilarMoviesById(filmId),
  ]).then(([mainData, credits, reviews, similar]) => {
    const filmData = { mainData, credits, reviews, similar };
    const filmCardMarkup = fullCardMarkup(filmData);
    root.innerHTML = filmCardMarkup;
  });

  // getMovieById(filmId).then((filmData) => {

  // console.log(filmCardMarkup);
  // });
}
