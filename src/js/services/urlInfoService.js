import { ORDER, SORTBY } from "../../main";
import { pathObject } from "./routing";

export function getUrlInfo() {
  let pathName = window.location.pathname.slice(1);

  const params = new URLSearchParams(window.location.search);

  return {
    pathName,
    search: parseSearchQuery(params.get("query")),
    page: parsePage(params.get("page")),
    genres: parseGenres(params.get("with_genres")),
    filmId: parseFilmId(params.get("filmId")),
    sortBy: parseSortBy(params.get("sortBy")),
    order: parseOrder(params.get("order")),
  };
}

function parsePage(value) {
  if (value === null || value === "") return null;
  const pageValue = Number(value);
  if (!Number.isInteger(pageValue) || Number(pageValue) < 1) return null;
  return pageValue;
}
function parseSearchQuery(value) {
  if (!value) return "";
  return value.trim();
}
function parseGenres(value) {
  //  params.get("with_genres")?.split(",") || [],
  // return genres.split(",");
  if (!value) return [];
  return value
    .split(",")
    .map(Number)
    .filter((id) => Number.isInteger(id) && id > 0);
}
function parseFilmId(value) {
  if (value === null || value === "") return null;
  const filmId = Number(value);
  if (!Number.isInteger || Number(filmId) < 1) return null;

  return filmId;
}
function parseSortBy(value) {
  if (!Object.values(SORTBY).includes(value)) return null;

  return value;
}
function parseOrder(value) {
  if (!Object.values(ORDER).includes(value)) return null;

  return value;
}

// params: ["page", "search", "genres", "sortBy", "order", "filmId"],

const routeConfiguration = {
  home: { path: "", params: ["filmId"] },
  movies: {
    path: "",
    params: ["page", "search", "filmId"],
  },
  genres: {
    path: "",
    params: ["page", "genres", "sortBy", "order", "filmId"],
  },
  popular: { path: "", params: ["page", "filmId"] },
  toprated: { path: "", params: ["page", "filmId"] },
  upcoming: { path: "", params: ["page", "filmId"] },
  favorites: { path: "", params: ["page", "filmId"] },
  queue: { path: "", params: ["page", "filmId"] },
};

export function setUrlInfo({
  pathName = null,
  page = null,
  search = "",
  genres = [],
  sortBy = "",
  order = ORDER.DESC,
  filmId = null,
}) {
  let path = "";

  if (pathName === "") {
    path = pathObject["home"].path;
  } else path = pathObject[pathName]?.path;
  if (!path) {
    console.log(pathName, "wrong pathname");
    return;
  }

  const params = new URLSearchParams();
  if (page) {
    params.set("page", page);
  }
  if (search) {
    params.set("query", search);
  }
  if (genres?.length > 0) {
    params.set("with_genres", genres.join(","));
  }

  if (sortBy) {
    const orderStr = order ? order : ORDER.DESC;
    params.set("sortBy", sortBy);
    params.set("order", orderStr);
  }

  if (filmId) {
    params.set("filmId", filmId);
  }

  for (const [key, value] of params) {
    console.log(`key ${key} => value ${value}`);
  }

  const base = window.location.origin;
  const query = params.toString().replaceAll("%2C", ",");
  const url = query ? `${base}${path}?${query}` : `${base}${path}`;

  const resObj = Object.fromEntries(params);
  window.history.pushState(resObj, "", url);

  document.title =
    String(pathName).charAt(0).toUpperCase() + String(pathName).slice(1);
}
