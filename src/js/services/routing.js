import { ORDER, SORTBY } from "../../main";
import { popularObj, topRatedObj, upcomingObj } from "../data";

import { favoritesPage } from "../routes/favorites";
import { genresPage } from "../routes/genres";
import { homePage } from "../routes/home";
import { logoutPage } from "../routes/logout";
import { moviesPage } from "../routes/movies";
import { queuePage } from "../routes/queque";
import { settingsPage } from "../routes/settings";
import { mainRef } from "./refs";

export const pathObject = {
  home: { path: "/", name: "home", func: homePage },
  movies: { path: "/movies", name: "movies", func: moviesPage },

  genres: { path: "/genres", name: "genres", func: genresPage },
  popular: {
    path: "/popular",
    name: "popular",
    func: () => moviesPage("Popular", popularObj),
  },
  toprated: {
    path: "/toprated",
    name: "top rated",
    func: () => moviesPage("Top Rated", topRatedObj),
  },
  upcoming: {
    path: "/upcoming",
    name: "upcoming",
    func: () => moviesPage("Upcoming", upcomingObj),
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
  console.log(window.location.search);
  const pathName = window.location.pathname.slice(1);

  if (!window.location.search) {
    return { pathName, search: "", page: null, genres: [] };
  }
  // let [searchQuery, ...params] = window.location.search.split("&");
  const searchParams = window.location.search.slice(1).split("&");

  let searchQueryStr = "";
  let genresQueryArr = [];
  let pageQueryStr = "";
  // ??? other queries

  console.log(searchParams);

  searchParams.forEach((query) => {
    if (query.includes("page=")) pageQueryStr = query.split("page=")[1];
    if (query.includes("with_genres="))
      genresQueryArr = query.split("with_genres=")[1].split(",");
    if (query.includes("query=")) searchQueryStr = query.split("query=")[1];
  });

  if (!pageQueryStr || isNaN(pageQueryStr) || Number(pageQueryStr) < 1)
    pageQueryStr = null;
  return {
    pathName,
    search: searchQueryStr,
    page: pageQueryStr,
    genres: genresQueryArr,
  };
}

export function setUrlInfo({
  pathName = null,
  search = "",
  page = null,
  genresArr = [],
  sortBy = SORTBY.POPULARITY,
  order = ORDER.DESC,
}) {
  const locationProtocol = window.location.protocol;
  const locationHost = window.location.host;
  let baseUrl = locationProtocol + "//" + locationHost;
  let newURL = "";

  const pageStr = page ? `&page=${page}` : "";

  const searchQueryStr = search ? `?query=${search}` : "";

  const genresArrStr =
    genresArr.length > 0 ? `&with_genres=${genresArr.join(",")}` : "";

  const sortByStr =
    sortBy && Object.values(SORTBY).includes(sortBy)
      ? sortBy
      : SORTBY.POPULARITY;
  const orderStr =
    order && Object.values(ORDER).includes(order) ? order : ORDER.DESC;

  if (pathName === "home" || !pathObject[pathName]) {
    pathName = "home";
    newURL = baseUrl + pathObject[pathName].path;
    window.history.pushState({ path: newURL }, "", newURL);
    return newURL;
  }

  if (pathName === "movies") {
    const pageStr = page && searchQueryStr ? `&page=${page}` : "";
    // !!
    newURL = baseUrl + pathObject[pathName].path + searchQueryStr + pageStr;
    window.history.pushState({ path: newURL }, "", newURL);
    return newURL;
  }

  if (pathName === "genres") {
    if (!genresArrStr) {
      newURL = baseUrl + pathObject[pathName].path;
      window.history.pushState({ path: newURL }, "", newURL);
      return;
    }
  }

  if (
    pathName === "popular" ||
    pathName === "toprated" ||
    pathName === "upcoming"
  ) {
    newURL = !pageStr
      ? baseUrl + pathObject[pathName].path
      : baseUrl + pathObject[pathName].path + "?" + pageStr;
    window.history.pushState({ path: newURL }, "", newURL);
    return newURL;
  }

  // if pathName is falsy or location pathname isn't valid route (not it pathObj), set to default home and return:
  // if (!pathName || !pathObject[pathName]) {
  //   pathName = "home";
  //   newURL = baseUrl + pathObject[pathName].path;
  //   window.history.pushState({ path: newURL }, "", newURL);
  //   return newURL;
  // }

  // for search by title
  // if (!!searchQuery) {
  //   pathName = "movies";
  //   page = !!page ? page : 1;
  // }
  // for

  // if genresArr was passed, slug it:
  const genresList =
    genresArr.length > 1 ? `&with_genres=${genresArr.join(",")}` : "";
  // if orderQuery and sortQuery valid, overwise use default values
  const orderQuery = ORDER[order] ? order : ORDER.DESC;
  const sortQuery = SORTBY[sortBy] ? sortBy : SORTBY.POPULARITY;

  // if (pathObject[window.location.pathname.slice(1)]) {
  //   pathName = window.location.pathname.slice(1);
  // }

  // if searchQuery is emplty or false
  // if (!searchQuery) {
  //   newURL =
  //     window.location.protocol +
  //     "//" +
  //     window.location.host +
  //     pathObject[pathName].path +
  //     `${genresList}`;
  // }

  // else {
  //   newURL =
  //     window.location.protocol +
  //     "//" +
  //     window.location.host +
  //     pathObject[pathName].path +
  //     `?${searchQuery}&page=${page}`;
  // }

  // window.history.pushState({ path: newURL }, "", newURL);
}
