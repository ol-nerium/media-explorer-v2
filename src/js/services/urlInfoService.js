import { ORDER, SORTBY } from "../../main";
import { errorToaster } from "../interfaces";
import { changeActiveNavLinkColor } from "../utils";
import { pathObject, setState } from "./routing";

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

export function setUrlInfo({
  pathName = null,
  page = null,
  search = "",
  genres = [],
  sortBy = "",
  order = ORDER.DESC,
  filmId = null,
}) {
  // console.trace();

  const path = pathObject[pathName || "home"].path;
  newURL = baseUrl + path + "?";
  let stateObj = { pathName: path.slice(1) };

  if (pathName === "home") {
    [createFilmIdQuery(filmId)].forEach((item) => {
      if (item.query) newURL += item.query + "&";
      if (item.obj) stateObj = { ...stateObj, ...item.obj };
    });
  }

  if (pathName === "movies") {
    [
      createSearchQueryObj(search),
      createPageQueryObj(page),
      createFilmIdQuery(filmId),
    ].forEach((item) => {
      if (item.query) newURL += item.query + "&";
      if (item.obj) stateObj = { ...stateObj, ...item.obj };
    });
  }

  if (pathName === "genres") {
    [
      createPageQueryObj(page),
      createGenresQueryObj(genres),
      createSortQueryObj(sortBy, order),
      createFilmIdQuery(filmId),
    ].forEach((item) => {
      if (item.query) newURL += item.query + "&";
      if (item.obj) stateObj = { ...stateObj, ...item.obj };
    });
  }

  if (
    pathName === "popular" ||
    pathName === "toprated" ||
    pathName === "upcoming" ||
    pathName === "favorites" ||
    pathName === "queue"
  ) {
    [createPageQueryObj(page), createFilmIdQuery(filmId)].forEach((item) => {
      if (item.query) newURL += item.query + "&";
      if (item.obj) stateObj = { ...stateObj, ...item.obj };
    });
  }

  // if (pathName === "settings" || pathName === "logout") {
  //   const path = pathObject[pathName].path;
  //   newURL = baseUrl + path;
  //   let stateObj = { path };

  //   window.history.pushState({ ...stateObj }, "", newURL);
  // }

  window.history.pushState({ ...stateObj }, "", newURL.slice(0, -1));
  setState(stateObj);

  console.log(genres);

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
  return { obj: { genres: [] }, query: "" };
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
