import "./style.css";
import { headerMarkup } from "./js/sectionCreate";

import {
  // getMoviesByFilters,
  getGenresList,
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getTopRatedMoviesList,
  getUpcomingMoviesList,
  // getTMDBTrendingByDayMoviesList,
  // getTMDBTrendingByWeekMoviesList,
  // getKeyWordTitleById,
  getMovieById,
  getKeywordIdByTitle,
  getMovieByTitle,
  fetchResultsByIds,
  getExternalFilmVideosById,
  getMoviesByGenre,
} from "./js/services/apiService";

import {
  homePage,
  moviesPage,
  genresPage,
  watchlistPage,
  historyPage,
  favoritesPage,
  queuePage,
} from "./js/routingMarkup";
import { onMobHeaderBtnClick } from "./js/mobileMenu";
import { genreChipsInterface, onSelectChange } from "./js/sorting";

const pathObject = {
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

const root = document.getElementById("app");
root.insertAdjacentHTML("afterbegin", headerMarkup());

const headerRoot = document.querySelector(".header");
headerRoot.addEventListener("click", clickOnNavLink);

export function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt.target.closest("a");
  if (!link) return;

  drawMarkupFromPageName(link.href);
}

function changeTitleText(pathName) {
  const headerTitleNarrowScreen = document.querySelector(".headerTitle");
  const headerTitleWideScreen = document.querySelector(".main-page-info-title");

  if (headerTitleNarrowScreen) headerTitleNarrowScreen.textContent = pathName;
  if (headerTitleWideScreen) headerTitleWideScreen.textContent = pathName;
}

function drawMarkupFromPageName(urlPath = document.URL) {
  const url = new URL(urlPath);
  const actualPath = window.location.pathname;
  const passedPath = url.pathname;
  const sameLink = actualPath === passedPath;

  const pathName = url.pathname === "/" ? "home" : url.pathname.slice(1);

  if (!pathObject[pathName]) return;

  let newURL =
    window.location.protocol +
    "//" +
    window.location.host +
    pathObject[pathName].path;

  window.history.pushState({ path: newURL }, "", newURL);

  let main = document.querySelector("main");

  if (!main) {
    const mainElement = document.createElement("main");
    root.insertAdjacentElement("afterbegin", mainElement);
    main = document.querySelector("main");
  }

  if (!sameLink) {
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
    changeTitleText(pathName);
  }
}

function firstLoad() {
  const actualPath = window.location.pathname;

  const pathName = actualPath === "/" ? "home" : actualPath.slice(1);
  if (!pathObject[pathName]) {
    let newURL = window.location.protocol + "//" + window.location.host + "/";
    window.history.pushState({ path: newURL }, "", newURL);
    drawMarkupFromPageName();
    return;
  }

  let main = document.querySelector("main");
  if (!main) {
    const mainElement = document.createElement("main");
    root.insertAdjacentElement("afterbegin", mainElement);
    main = document.querySelector("main");
  }
  main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
  changeTitleText(pathName);
}

firstLoad();

const mobileLayout = document.querySelector(".mobile-header-layout");
mobileLayout.addEventListener("click", onMobHeaderBtnClick);

const genresChipsRoot = document.querySelector(".genres-chips");
genresChipsRoot.addEventListener("click", genreChipsInterface);

const sortingDropDown = document.getElementById("sortingDropdown");
sortingDropDown.addEventListener("change", onSelectChange);

// const hero = document.querySelector(".hero");
// hero.addEventListener("click", heroInterface);
