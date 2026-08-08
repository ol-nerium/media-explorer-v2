import { ORDER, SORTBY } from "../../main";
import { fullCardMarkup } from "../components/fullCard";
import { popularObj, topRatedObj, upcomingObj } from "../data";
import { closeModal } from "../interfaces/modalInterface";
import { openFilmCard } from "../interfaces/openFullFilmCard";

import { favoritesPage } from "../routes/favorites";
import { genresPage } from "../routes/genres";
import { homePage } from "../routes/home";
import { logoutPage } from "../routes/logout";
import {
  moviesPage,
  searchedByGenresMoviesPage,
  searchedMoviesPage,
} from "../routes/movies";
import { popularPage } from "../routes/popular";
import { queuePage } from "../routes/queque";
import { settingsPage } from "../routes/settings";
import { topRatedPage } from "../routes/toprated";
import { upcomingPage } from "../routes/upcoming";
import {
  changeActiveNavLinkColor,
  changeTitleText,
  genresListData,
} from "../utils";
import {
  getMoviesByGenre,
  getMoviesByTitle,
  getPopularMoviesList,
  getTopRatedMoviesList,
  getUpcomingMoviesList,
} from "./apiService";
import { listenersReload, mainRef } from "./refs";

let pathName = "";
let search = "";
let page = "";
let genres = [];

let filmId = "";

let main;

const locationProtocol = window.location.protocol;
const locationHost = window.location.host;
let baseUrl = locationProtocol + "//" + locationHost;

let newURL = baseUrl;

export let activeGenresArr = [];

export const pathObject = {
  home: { path: "/", name: "home", func: homePage, fetchFunc: null },
  movies: {
    path: "/movies",
    name: "movies",
    func: moviesPage,
    fetchFunc: null,
  },

  genres: {
    path: "/genres",
    name: "genres",
    func: genresPage,
    fetchFunc: null,
  },
  popular: {
    path: "/popular",
    name: "popular",
    func: popularPage,
    fetchFunc: getPopularMoviesList,
  },
  toprated: {
    path: "/toprated",
    name: "top rated",
    func: topRatedPage,
    fetchFunc: getTopRatedMoviesList,
  },
  upcoming: {
    path: "/upcoming",
    name: "upcoming",
    func: upcomingPage,
    fetchFunc: getUpcomingMoviesList,
  },

  favorites: {
    path: "/favorites",
    name: "favorites",
    func: favoritesPage,
    fetchFunc: null,
  },
  queue: { path: "/queue", name: "queue", func: queuePage, fetchFunc: null },
  settings: {
    path: "/settings",
    name: "settings",
    func: settingsPage,
    fetchFunc: null,
  },
  logout: {
    path: "/logout",
    name: "logout",
    func: logoutPage,
    fetchFunc: null,
  },
};

export function getUrlInfo() {
  const pathName = window.location.pathname.slice(1);
  let searchQueryStr = "";
  let genresQueryArr = [];
  let pageQueryStr = "";
  let filmIdQuery = "";

  let sortByQuery = "";
  let orderQuery = "";

  if (!window.location.search) {
    return { pathName, search: "", page: null, genres: [] };
  }
  const searchParams = window.location.search.slice(1).split("&");
  // console.log(searchParams);

  // ??? other queries

  searchParams.forEach((query) => {
    if (query.includes("page=")) pageQueryStr = query.split("page=")[1];
    if (query.includes("with_genres="))
      genresQueryArr = query.split("with_genres=")[1].split(",");
    if (query.includes("query=")) searchQueryStr = query.split("query=")[1];
    if (query.includes("filmId=")) filmIdQuery = query.split("filmId=")[1];
    if (query.includes("sortBy=")) {
      [sortByQuery, orderQuery] = query.split("sortBy=")[1].split(".");
    }
    // if (query.includes("sortBy=")) orderQuery = query.split("filmId=")[1];
  });

  // console.log(searchParams);

  if (!pageQueryStr || isNaN(pageQueryStr) || Number(pageQueryStr) < 1)
    pageQueryStr = null;
  return {
    pathName,
    search: searchQueryStr,
    page: pageQueryStr,
    genres: genresQueryArr,
    filmId: filmIdQuery,
    sortBy: sortByQuery,
  };
}

export function setUrlInfo({
  pathName = null,
  page = null,
  search = "",
  genresArr = [],
  sortBy = "",
  order = ORDER.DESC,
  filmId = null,
}) {
  changeActiveNavLinkColor(pathName);
  console.log("changes url params");
  // createPageQueryObj();
  // createSearchQueryObj();
  // createGenresQueryObj();
  // createSortQueryObj();

  if (!pathName) getUrlInfo().pathName;
  if (!page) getUrlInfo().page;
  if (!search) getUrlInfo().search;
  if (genresArr.length < 1) getUrlInfo().genres;
  if (!sortBy) getUrlInfo().sortBy;
  if (!order) getUrlInfo().order;
  if (!filmId) getUrlInfo().filmId; // why?

  if (pathName === "home" || !pathObject[pathName]) {
    newURL = baseUrl + pathObject[pathName].path;
    window.history.pushState({ path: newURL }, "", newURL);
    return newURL;
  }

  if (pathName === "movies") {
    const path = pathObject[pathName].path;
    newURL = baseUrl + path + "?";
    let stateObj = { path };
    [createSearchQueryObj(search), createPageQueryObj(page)].forEach((item) => {
      if (item.query) newURL += item.query + "&";
      if (item.obj) stateObj = { ...stateObj, ...item.obj };
    });

    window.history.pushState({ ...stateObj }, "", newURL.slice(0, -1));
  }

  if (pathName === "genres") {
    const path = pathObject[pathName].path;
    newURL = baseUrl + path + "?";
    let stateObj = { path };
    [
      createPageQueryObj(page),
      createGenresQueryObj(genresArr),
      createSortQueryObj(sortBy, order),
    ].forEach((item) => {
      if (item.query) newURL += item.query + "&";
      if (item.obj) stateObj = { ...stateObj, ...item.obj };
    });

    window.history.pushState({ ...stateObj }, "", newURL.slice(0, -1));
  }

  if (
    pathName === "popular" ||
    pathName === "toprated" ||
    pathName === "upcoming" ||
    pathName === "favorites" ||
    pathName === "queue"
  ) {
    const path = pathObject[pathName].path;
    newURL = baseUrl + path + "?";
    let stateObj = { path };
    [createPageQueryObj(page)].forEach((item) => {
      if (item.query) newURL += item.query + "&";
      if (item.obj) stateObj = { ...stateObj, ...item.obj };
    });

    window.history.pushState({ ...stateObj }, "", newURL.slice(0, -1));
  }

  if (pathName === "settings" || pathName === "logout") {
    const path = pathObject[pathName].path;
    newURL = baseUrl + path;
    let stateObj = { path };

    window.history.pushState({ ...stateObj }, "", newURL);
  }
}

export function setFilmCardUrlInfo(filmId) {
  console.log("previous link (go from)", getUrlInfo());

  // const { genres, page, pathName, search } = getUrlInfo();
  ({ pathName, search, page, genres } = getUrlInfo());
  console.log(filmId);
  const newPath = pathName + "?filmId=" + filmId;

  let newURL =
    window.location.protocol + "//" + window.location.host + "/" + newPath;

  window.history.pushState({ path: newURL }, "", newURL);
}

function createPageQueryObj(page) {
  if (page) {
    return { obj: { page }, query: `page=${page}` };
  }
  return { obj: {}, query: "" };
}
function createSearchQueryObj(search) {
  if (search) {
    return { obj: { query: search }, query: `query=${search}` };
  }
  return { obj: {}, query: "" };
}
function createGenresQueryObj(genresArr) {
  console.log(genresArr?.length > 0);
  if (genresArr?.length > 0) {
    return {
      obj: { genres: genresArr },
      query: `with_genres=${genresArr.join(",")}`,
    };
  }
  return { obj: {}, query: "" };
}
function createSortQueryObj(sortBy, order = ORDER.DESC) {
  if (sortBy) {
    return {
      obj: { sortBy: sortBy, order },
      query: `sortBy=${sortBy}.${order}`,
    };
  }
  return { obj: {}, query: "" };
}

export function drawMarkupFromPageURL(targetURL = null, page = 1) {
  main = mainRef();
  ({ pathName, search, page, genres, filmId } = getUrlInfo());
  console.log(pathName, search, page, genres, filmId);

  if (targetURL) {
    // redirecting after navigation actions logic:
    const targetLocation = new URL(targetURL);
    const targetPath = targetLocation.pathname;
    const targetPathName =
      targetPath === "/" || !pathObject[targetPath.slice(1)]
        ? "home"
        : targetPath.slice(1);

    setUrlInfo({ pathName: targetPathName });
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[targetPathName].func());
    changeTitleText(targetPathName);

    listenersReload();

    return;
  }

  if (!pathObject[pathName]) {
    const targetPathName = "home";

    setUrlInfo({ pathName: targetPathName });
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[targetPathName].func());
    changeTitleText(targetPathName);
    listenersReload();
    return;
  }

  // setUrlInfo({ pathName, search, page, genres, filmId });
  if (filmId) {
    openFilmCard(filmId);
  } else closeModal();

  main.innerHTML = "";
  main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
  changeTitleText(pathName);
  listenersReload();

  // if (!targetLocation.search) {
  //   setUrlInfo({ pathName });
  // }

  // if (actualPath !== targetPath) {
  //   main.innerHTML = "";
  //   main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
  //   changeTitleText(pathName);
  //   listenersReload();
  //   setUrlInfo({ search: null, page: null, pathName });

  //   return;
  // }

  // if (!searchQuery) {
  //   main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
  //   changeTitleText(pathName);
  //   setUrlInfo({ search:searchQuery, page, pathName });

  //   listenersReload();
  //   return;
  // } else {
  //   openFetchedGalleryPage(page || 1, searchQuery);
  //   setUrlInfo({ search: searchQuery, page: page, pathName: "movies" });
  //   listenersReload();
  // }
}

export function openFetchedGalleryPage(page = 1, searchQuery) {
  getMoviesByTitle(page, searchQuery)
    .catch(console.log)
    .then((galleryData) => {
      setUrlInfo({ pathName: "movies", search: searchQuery, page });

      const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);
      document.querySelector("main").innerHTML = galleryMarkup;
      listenersReload();

      // console.log(window.location);
      console.log(window.history.state);
      // can be doubling code
    });
}
