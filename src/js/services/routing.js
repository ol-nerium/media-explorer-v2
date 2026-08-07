import { ORDER, SORTBY } from "../../main";
import { fullCardMarkup } from "../components/fullCard";
import { popularObj, topRatedObj, upcomingObj } from "../data";

import { favoritesPage } from "../routes/favorites";
import { genresPage } from "../routes/genres";
import { homePage } from "../routes/home";
import { logoutPage } from "../routes/logout";
import { moviesPage } from "../routes/movies";
import { popularPage } from "../routes/popular";
import { queuePage } from "../routes/queque";
import { settingsPage } from "../routes/settings";
import { topRatedPage } from "../routes/toprated";
import { upcomingPage } from "../routes/upcoming";
import { changeActiveNavLinkColor } from "../utils";
import { mainRef } from "./refs";

export const pathObject = {
  home: { path: "/", name: "home", func: homePage },
  movies: { path: "/movies", name: "movies", func: moviesPage },

  genres: { path: "/genres", name: "genres", func: genresPage },
  popular: {
    path: "/popular",
    name: "popular",
    func: popularPage,
  },
  toprated: {
    path: "/toprated",
    name: "top rated",
    func: topRatedPage,
  },
  upcoming: {
    path: "/upcoming",
    name: "upcoming",
    func: upcomingPage,
  },

  favorites: { path: "/favorites", name: "favorites", func: favoritesPage },
  queue: { path: "/queue", name: "queue", func: queuePage },
  settings: {
    path: "/settings",
    name: "settings",
    func: settingsPage,
  },
  logout: {
    path: "/logout",
    name: "logout",
    func: logoutPage,
  },
};

export function getUrlInfo() {
  const pathName = window.location.pathname.slice(1);

  if (!window.location.search) {
    return { pathName, search: "", page: null, genres: [] };
  }
  const searchParams = window.location.search.slice(1).split("&");
  // console.log(searchParams);

  let searchQueryStr = "";
  let genresQueryArr = [];
  let pageQueryStr = "";
  let filmIdQuery = "";
  // ??? other queries

  searchParams.forEach((query) => {
    if (query.includes("page=")) pageQueryStr = query.split("page=")[1];
    if (query.includes("with_genres="))
      genresQueryArr = query.split("with_genres=")[1].split(",");
    if (query.includes("query=")) searchQueryStr = query.split("query=")[1];
    if (query.includes("filmId=")) filmIdQuery = query.split("filmId=")[1];
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
  };
}

const locationProtocol = window.location.protocol;
const locationHost = window.location.host;
let baseUrl = locationProtocol + "//" + locationHost;

let newURL = baseUrl;

export function setUrlInfo({
  pathName = null,
  page = null,
  search = "",
  genresArr = [],
  sortBy = "",
  order = ORDER.DESC,
}) {
  changeActiveNavLinkColor(pathName);

  // createPageQueryObj();
  // createSearchQueryObj();
  // createGenresQueryObj();
  // createSortQueryObj();

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

  const { genres, page, pathName, search } = getUrlInfo();
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
