import { ORDER, SORTBY } from "../../main";
import { processSavedGalleryData } from "../utils/data";
import { closeModal } from "../interfaces/modalInterface";
import { openFilmCard } from "../interfaces/openFullFilmCard";
import { toTop } from "../interfaces/scrollInterface";
import {
  errorToaster,
  infoToaster,
  successToaster,
} from "../interfaces/toaster";

import { favoritesPage } from "../pages/favorites";
import { genresPage, searchedByGenresPage } from "../pages/genres";
import { homePage } from "../pages/home";
import { logoutPage } from "../pages/logout";
import { moviesPage, searchedMoviesPage } from "../pages/movies";
import { popularPage } from "../pages/popular";
import { queuePage } from "../pages/queque";
import { settingsPage } from "../pages/settings";
import { topRatedPage } from "../pages/toprated";
import { upcomingPage } from "../pages/upcoming";
import {
  changeActiveNavLinkColor,
  changeCheckedSortSelect,
  changeTitleText,
  genresArr,
  genresListData,
} from "../utils";
import {
  fetchResultsByIds,
  getMoviesByGenre,
  getMoviesByTitle,
  getPopularMoviesList,
  getTopRatedMoviesList,
  getUpcomingMoviesList,
} from "./apiService";
import { listenersReload, mainRef } from "./refs";
import { getUrlInfo, setUrlInfo } from "./urlInfoService";
import { loaderInterface } from "../interfaces/loaderInterface";

// let pathName = "";
// let search = "";
// let page = "";
// let sortBy = "";
// let order = "";
// let genres = [];
// let filmId = "";

let main;

const appState = {
  pathName: "",
  search: "",
  page: "",
  sortBy: "",
  order: "",
  genres: [],
  filmId: "",
};
export let activeGenresArr = [];
let result = null;

const setState = (newValuesObj) => {
  const stateKeys = Object.keys(appState);
  stateKeys.forEach((key) => {
    if (!newValuesObj.hasOwnProperty(key)) return;
    appState[key] = newValuesObj[key];
  });
};

const defaultMoviesFetchFunc = getPopularMoviesList;

export const pathObject = {
  home: { path: "/", name: "home", func: homePage, fetchFunc: null },
  movies: {
    path: "/movies",
    name: "movies",
    func: moviesPage,
    fetchFunc: defaultMoviesFetchFunc,
  },

  genres: {
    path: "/genres",
    name: "genres",
    func: genresPage,
    fetchFunc: getMoviesByGenre,
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

  queue: {
    path: "/queue",
    name: "queue",
    func: queuePage,
    fetchFunc: fetchResultsByIds,
  },
  // favorites: {
  //   path: "/favorites",
  //   name: "favorites",
  //   func: favoritesPage,
  //   fetchFunc: fetchResultsByIds,
  // },

  // settings: {
  //   path: "/settings",
  //   name: "settings",
  //   func: settingsPage,
  //   fetchFunc: null,
  // },
  // logout: {
  //   path: "/logout",
  //   name: "logout",
  //   func: logoutPage,
  //   fetchFunc: null,
  // },
};

export function setFilmCardUrlInfo(filmId) {
  const currentQuery = getUrlInfo();
  const pathName =
    currentQuery.pathName === "" ? "home" : currentQuery.pathName;

  let newQueryObj = {
    ...currentQuery,
    pathName: pathName,
    filmId,
  };

  setUrlInfo(newQueryObj);
  setState(newQueryObj);
}

export async function handleLocation(targetURL = null) {
  main = mainRef();
  setState(getUrlInfo());

  let { pathName, search, page, genres, filmId, sortBy, order } = appState;

  if (genres.length > 0) {
    activeGenresArr = genres;
  } else activeGenresArr = [];

  toTop();
  handleFilmId(filmId);

  if (targetURL) {
    return handleTargetRoute(targetURL);
  }

  if (pathName !== "" && !pathObject[pathName]) {
    // console.log("404 page should be here, redirect " + pathName);
    errorToaster({
      message: "wrong path..",
    });

    setState({ pathName: "home" });
    return handleHomeRoute();
  }

  if (pathName === "" || pathName === "home") {
    return handleHomeRoute();
  }

  await loaderInterface(() => drawMarkupFromUrlParams());
}

async function drawMarkupFromUrlParams() {
  const { pathName } = appState;
  if (pathName === "home" || !pathObject[pathName]) return null;

  if (pathName === "movies") {
    return handleMoviesRoute();
  }

  if (pathName === "genres") {
    return handleGenresRoute();
  }

  if (
    pathName === "popular" ||
    pathName === "toprated" ||
    pathName === "upcoming"
  ) {
    return handleFilteredPage();
  }

  if (pathName === "favorites" || pathName === "queue") {
    return handleSavedGalleryRoute();
  }
}

export async function openFetchedGalleryPage(page = 1, searchQuery) {
  try {
    const galleryData = await getMoviesByTitle(page, searchQuery);
    let pathName = "movies";
    setUrlInfo({ pathName, search: searchQuery, page });
    setState({ pathName, search: searchQuery, page });

    pathObject[pathName].fetchFunc = (page) =>
      getMoviesByTitle(page, searchQuery);

    const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);
    mainRef().innerHTML = galleryMarkup;
    changeActiveNavLinkColor();
    changeTitleText(`Movies search`);
    successToaster({ message: "Successful!" });
    infoToaster({ message: `Search for "${searchQuery}", page ${page}` });
    listenersReload();
  } catch (err) {
    errorToaster({ message: `Something's gone wrong` });
    console.log(err);
  }
}

export async function openFetchedByPathName(page = 1, pathName) {
  const fetchFunc = pathObject[pathName]
    ? pathObject[pathName].fetchFunc
    : null;

  if (!fetchFunc) {
    const galleryMarkup = pathObject[pathName].func();
    mainRef().innerHTML = galleryMarkup;
    changeActiveNavLinkColor();
    changeTitleText(pathName);

    listenersReload();

    return null;
  }

  try {
    const galleryData = await fetchFunc(page);

    pathObject[pathName].fetchFunc = (page) =>
      fetchFunc(page, `search for ${pathName}`);

    const galleryMarkup = pathObject[pathName].func(pathName, galleryData);
    mainRef().innerHTML = galleryMarkup;
    changeActiveNavLinkColor();
    changeTitleText(pathName);
    listenersReload();
  } catch (err) {
    errorToaster({ message: `Something's gone wrong` });
    console.log(err);
  }
}

export async function openGalleryByGenres(
  page,
  genreIdArr,
  sortBy = null,
  order = null,
) {
  console.log("1: openGallery START");
  const currentUrlInfo = getUrlInfo();

  let sortByQuery = currentUrlInfo.sortBy || sortBy ? null : SORTBY.POPULARITY;
  if (!sortByQuery) {
    sortByQuery = sortBy ? sortBy : currentUrlInfo.sortBy;
  }

  let orderQuery =
    order && (ORDER.ASC === order || ORDER.DESC === order) ? order : ORDER.DESC;

  try {
    const galleryData = await getMoviesByGenre(
      page,
      genreIdArr,
      sortByQuery,
      orderQuery,
    );

    console.log("2: getMoviesByGenre FINISHED");

    setUrlInfo({
      pathName: "genres",
      genres: genreIdArr,
      page,
      sortBy: sortByQuery,
      order: orderQuery,
    });
    setState({
      pathName: "genres",
      genres: genreIdArr,
      page,
      sortBy: sortByQuery,
      order: orderQuery,
    });

    pathObject["genres"].fetchFunc = (page) =>
      getMoviesByGenre(page, genreIdArr, sortBy, order);

    let searchedGenreNames = "";
    const searchedGenreNamesArr = [];
    genresListData.genres.forEach((genre) => {
      if (genreIdArr.includes(JSON.stringify(genre.id))) {
        searchedGenreNames += genre.name + " ";
        searchedGenreNamesArr.push(genre.name);
      }
    });

    const galleryMarkup = searchedByGenresPage(searchedGenreNames, galleryData);
    mainRef().innerHTML = galleryMarkup;
    console.log("4: DOM updated");
    changeTitleText("genres");

    changeActiveNavLinkColor();
    listenersReload();

    return galleryData;
  } catch (err) {
    if (err.status === 404) {
      errorToaster({ message: "No such genre in the base" });
      console.log(err);

      return null;
    }
    errorToaster({ message: "Something went wrong, try later" });
    console.log(err);

    return null;
  }
}

export async function openSavedGallery(page = 1, pathName) {
  const { idResults, total_pages, total_results } =
    processSavedGalleryData(pathName);

  const pageQuery = page ? page - 1 : 0; // pageQuery shifted by -1 relative to page index here

  let filmData = [];

  if (!idResults[pageQuery]) {
    filmData = {
      page: pageQuery,
      results: [],
      total_pages: 1,
      total_results: 0,
    };

    const markup = queuePage(filmData);
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", markup);

    changeTitleText(pathName);

    changeActiveNavLinkColor();

    listenersReload();
    return filmData;
  }

  try {
    const res = await fetchResultsByIds(idResults[pageQuery]);
    filmData = {
      page: pageQuery + 1,
      results: res.map((i) => i.value),
      total_pages,
      total_results,
    };

    // console.log(filmData);

    const markup = queuePage(filmData);
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", markup);

    changeTitleText(pathName);

    changeActiveNavLinkColor();

    listenersReload();
    return filmData;
  } catch (error) {
    console.log(error, "need smth maybe for indication");
  }
}

export async function drawDefaultPage() {
  const { pathName } = appState;
  if (pathName === "queue") {
    const result = await loaderInterface(() => openSavedGallery(1, pathName));
    console.log(result);
    return result;
  }

  main.innerHTML = "";
  // here should be handling if there are something in the url that will change behaviour and fetch another page than default
  const markup = pathObject[pathName].func();
  main.insertAdjacentHTML("afterbegin", markup);
  changeTitleText(pathName);

  changeActiveNavLinkColor();
  listenersReload();
}

async function handleTargetRoute(targetURL) {
  // redirecting after navigation actions logic:
  const targetLocation = new URL(targetURL);
  const targetPath = targetLocation.pathname;
  const targetPathName =
    targetPath === "/" || !pathObject[targetPath.slice(1)]
      ? "home"
      : targetPath.slice(1);

  if (targetPathName === "movies") {
    pathObject[targetPathName].fetchFunc = defaultMoviesFetchFunc;
  }

  activeGenresArr = [];
  setUrlInfo({ pathName: targetPathName });
  setState({ pathName: targetPathName });

  if (targetPathName === "favorites" || targetPathName === "queue") {
    const result = await loaderInterface(() =>
      openSavedGallery(appState.page, targetPathName),
    );
    console.log("SHOULD OPEN SMTH");
    return result;
  }

  main.innerHTML = "";
  main.insertAdjacentHTML("afterbegin", pathObject[targetPathName].func());
  changeTitleText(targetPathName);
  changeActiveNavLinkColor();
  listenersReload();
}

async function handleFilmId(filmId) {
  if (!filmId) return closeModal();
  await loaderInterface(() => openFilmCard(filmId));
}

async function handleHomeRoute() {
  const targetPathName = "home";

  setUrlInfo({ pathName: targetPathName });
  setState({ pathName: targetPathName });

  main.innerHTML = "";
  main.insertAdjacentHTML("afterbegin", pathObject[targetPathName].func());
  changeTitleText(targetPathName);
  activeGenresArr = []; //?
  changeActiveNavLinkColor();

  listenersReload();
  return;
}

async function handleMoviesRoute() {
  const { search, page, pathName } = appState;
  if (search) {
    result = await loaderInterface(() => openFetchedGalleryPage(page, search));
    return result;
  }

  pathObject[pathName].fetchFunc = defaultMoviesFetchFunc;

  if (page && page > 0) {
    setUrlInfo({ pathName, page });
    setState({ pathName, page });

    result = await loaderInterface(() => openFetchedByPathName(page, pathName));
    return result;
  }

  result = await loaderInterface(() => drawDefaultPage());

  return result;
}

async function handleGenresRoute() {
  let { genres, pathName, page, sortBy, order } = appState;
  if (genres?.length < 1) {
    setUrlInfo({ pathName });

    result = await loaderInterface(() => drawDefaultPage());
    return result;
  }
  if (genres?.length > 0) {
    page = page ? page : 1;

    result = await loaderInterface(() =>
      openGalleryByGenres(page, genres, sortBy, order),
    );

    changeCheckedSortSelect();

    return result;
  }
}

async function handleSavedGalleryRoute() {
  const { page, pathName } = appState;

  result = await loaderInterface(() => openSavedGallery(page, pathName));
  return result;
}

async function handleFilteredPage() {
  const { page, pathName } = appState;
  if (page && page > 0) {
    setUrlInfo({ pathName, page });
    setState({ pathName, page });
    result = await loaderInterface(() => openFetchedByPathName(page, pathName));
  } else result = await loaderInterface(() => drawDefaultPage());
}
