import { ORDER, SORTBY } from "../../main";
import { errorToaster } from "../interfaces";
import { changeActiveNavLinkColor } from "../utils";
import { pathObject } from "./routing";

const locationProtocol = window.location.protocol;
const locationHost = window.location.host;
let baseUrl = locationProtocol + "//" + locationHost;

let newURL = baseUrl;

export function getUrlInfo() {
  let pathName = window.location.pathname.slice(1);
  let searchQueryStr = "";
  let genresQueryArr = [];
  let pageQueryStr = "";
  let filmIdQuery = "";

  let sortByQuery = "";
  let orderQuery = "";

  // pathName = pathName === "" ? "home" : pathName;

  if (!window.location.search) {
    return { pathName, search: "", page: null, genres: [] };
  }
  const searchParams = window.location.search.slice(1).split("&");

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

  if (!pageQueryStr || isNaN(pageQueryStr) || Number(pageQueryStr) < 1)
    pageQueryStr = null;

  return {
    pathName,
    search: searchQueryStr,
    page: pageQueryStr,
    genres: genresQueryArr,
    filmId: filmIdQuery,
    sortBy: sortByQuery,
    order: orderQuery,
  };
}

// const prevValues = {
//   pathName: null,
//   search: null,
//   genres: null,
//   page: null,
//   filmId: null,
//   sortBy: null,
//   order: null,
// };
// const keys = Object.keys(prevValues);

export function setUrlInfo({
  pathName = null,
  page = null,
  search = "",
  genres = [],
  sortBy = "",
  order = ORDER.DESC,
  filmId = null,
}) {
  // const currentValues = {
  //   pathName,
  //   page,
  //   search,
  //   genres,
  //   sortBy,
  //   order,
  //   filmId,
  // };

  // keys.forEach((key) => {
  //   if (prevValues[key] !== currentValues[key]) {
  //     console.log(
  //       "changes ",
  //       key,
  //       "from ",
  //       prevValues[key],
  //       "to ",
  //       currentValues[key],
  //     );
  //     prevValues[key] = currentValues[key];
  //   }
  // });

  if (pathName === "home") {
    const path = pathObject[pathName].path;
    newURL = baseUrl + path + "?";
    let stateObj = { path };

    [createFilmIdQuery(filmId)].forEach((item) => {
      if (item.query) newURL += item.query + "&";
      if (item.obj) stateObj = { ...stateObj, ...item.obj };
    });

    console.log(stateObj, newURL);

    // window.history.pushState({ path: newURL }, "", newURL);
    window.history.pushState({ ...stateObj }, "", newURL.slice(0, -1));
  }

  if (pathName === "movies") {
    const path = pathObject[pathName].path;
    newURL = baseUrl + path + "?";
    let stateObj = { path };
    [
      createSearchQueryObj(search),
      createPageQueryObj(page),
      createFilmIdQuery(filmId),
    ].forEach((item) => {
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
      createGenresQueryObj(genres),
      createSortQueryObj(sortBy, order),
      createFilmIdQuery(filmId),
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
    [createPageQueryObj(page), createFilmIdQuery(filmId)].forEach((item) => {
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

  document.title =
    String(pathName).charAt(0).toUpperCase() + String(pathName).slice(1);
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
function createGenresQueryObj(genres) {
  if (genres?.length > 0) {
    return {
      obj: { genres: genres },
      query: `with_genres=${genres.join(",")}`,
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

function createFilmIdQuery(filmId) {
  if (filmId) {
    return {
      obj: { filmId: filmId },
      query: `filmId=${filmId}`,
    };
  }
  return { obj: {}, query: "" };
}
