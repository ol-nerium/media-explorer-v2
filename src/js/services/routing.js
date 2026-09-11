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

export const appState = {
  pathName: "",
  search: "",
  page: "",
  sortBy: "",
  order: "",
  genres: [],
  filmId: "",
};

export let currentFetchFunc = null;

// export const setState = (newValuesObj) => {
export const setState = (newValuesObj) => {
  const stateKeys = Object.keys(appState);

  stateKeys.forEach((key) => {
    if (!newValuesObj.hasOwnProperty(key)) {
      return;
    }
    appState[key] = newValuesObj[key];
  });
};

const defaultMoviesFetchFunc = getPopularMoviesList;

export const pathObject = {
  home: {
    path: "/",
    name: "home",
    render: homePage,
    // fetchFunc: null
  },
  movies: {
    path: "/movies",
    name: "movies",
    render: moviesPage,
    fetchFunc: defaultMoviesFetchFunc,
  },

  genres: {
    path: "/genres",
    name: "genres",
    render: genresPage,
    fetchFunc: getMoviesByGenre,
  },
  popular: {
    path: "/popular",
    name: "popular",
    render: popularPage,
    fetchFunc: getPopularMoviesList,
  },
  toprated: {
    path: "/toprated",
    name: "top rated",
    render: topRatedPage,
    fetchFunc: getTopRatedMoviesList,
  },
  upcoming: {
    path: "/upcoming",
    name: "upcoming",
    render: upcomingPage,
    fetchFunc: getUpcomingMoviesList,
  },

  queue: {
    path: "/queue",
    name: "queue",
    render: queuePage,
    fetchFunc: fetchResultsByIds,
  },
  // favorites: {
  //   path: "/favorites",
  //   name: "favorites",
  //   render: favoritesPage,
  //   fetchFunc: fetchResultsByIds,
  // },

  // settings: {
  //   path: "/settings",
  //   name: "settings",
  //   render: settingsPage,
  //   fetchFunc: null,
  // },
  // logout: {
  //   path: "/logout",
  //   name: "logout",
  //   render: logoutPage,
  //   fetchFunc: null,
  // },
};

const routes = {
  home: { handler: handleHomeRoute },
  movies: { handler: handleMoviesRoute },
  genres: { handler: handleGenresRoute },
  popular: { handler: handleFilteredPage },
  toprated: { handler: handleFilteredPage },
  upcoming: { handler: handleFilteredPage },
  queue: { handler: handleSavedGalleryRoute },
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

  navigate(newQueryObj);
}

export async function handleLocation(targetURL = null) {
  toTop();

  if (targetURL) {
    return handleTargetRoute(targetURL);
  }

  return loaderInterface(() => drawMarkupFromUrlParams());
}

async function drawMarkupFromUrlParams() {
  // navigate(getUrlInfo());
  await handleFilmId();

  const route = routes[appState.pathName];

  if (!route) {
    return handleHomeRoute();
  }

  return route.handler();
}

async function handleTargetRoute(targetURL) {
  const targetLocation = new URL(targetURL);
  const targetPath = targetLocation.pathname;
  const targetPathName =
    targetPath === "/" || !pathObject[targetPath.slice(1)]
      ? "home"
      : targetPath.slice(1);

  if (targetPathName === "movies") {
    currentFetchFunc = defaultMoviesFetchFunc;
  }

  navigate({
    pathName: targetPathName,
    genres: [],
    page: 1,
    search: "",
    filmId: "",
  });

  // if (targetPathName === "favorites" || targetPathName === "queue") {
  if (targetPathName === "queue") {
    return loaderInterface(() =>
      openSavedGallery(appState.page, targetPathName),
    );
  }

  const markup = pathObject[targetPathName].render();

  renderPage(markup, targetPathName);
}

async function handleFilmId() {
  const { filmId } = appState;
  if (!filmId) return closeModal();
  return loaderInterface(() => openFilmCard(filmId));
}

async function handleHomeRoute() {
  const targetPathName = "home";
  const markup = pathObject[targetPathName].render();

  navigate({ pathName: targetPathName, genres: [] });
  return renderPage(markup, targetPathName);
}

async function handleMoviesRoute() {
  const { search, page, pathName } = appState;
  if (search) {
    return loaderInterface(() => openFetchedGalleryPage(page, search));
  }

  currentFetchFunc = defaultMoviesFetchFunc;

  if (page && page > 0) {
    // setUrlInfo({ pathName, page });

    navigate({ pathName, page });

    return loaderInterface(() => openFetchedByPathName(page, pathName));
  }

  return loaderInterface(() => drawDefaultPage());
}

async function handleGenresRoute() {
  let { genres, page, sortBy, order } = appState;
  if (genres?.length < 1) {
    return loaderInterface(() => drawDefaultPage());
  }
  if (genres?.length > 0) {
    page = page ? page : 1;
    order = order ? order : ORDER.DESC;
    sortBy = sortBy ? sortBy : SORTBY.POPULARITY;
    changeCheckedSortSelect();
    return loaderInterface(() =>
      openGalleryByGenres(page, genres, sortBy, order),
    );
  }
}

async function handleSavedGalleryRoute() {
  const { page, pathName } = appState;
  return loaderInterface(() => openSavedGallery(page, pathName));
}

async function handleFilteredPage() {
  const { page, pathName } = appState;
  if (page && page > 0) {
    // setUrlInfo({ pathName, page });
    navigate({ pathName, page });
    return loaderInterface(() => openFetchedByPathName(page, pathName));
  }

  return loaderInterface(() => drawDefaultPage());
}

export async function openFetchedGalleryPage(page = 1, searchQuery) {
  try {
    const galleryData = await getMoviesByTitle(page, searchQuery);
    let pathName = "movies";
    // setUrlInfo({ pathName, search: searchQuery, page });

    navigate({ pathName, search: searchQuery, page });

    currentFetchFunc = (page) => getMoviesByTitle(page, searchQuery);

    const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);

    infoToaster({ message: `Search for "${searchQuery}", page ${page}` });

    renderPage(galleryMarkup, `Movies search`);
  } catch (err) {
    errorToaster({ message: `Something's gone wrong` });
    console.log(err);
  }
}

export async function openFetchedByPathName(page = 1, pathName) {
  const path = pathObject[pathName];

  if (!path) {
    throw new Error(`Unknown path ${pathName}`);
  }

  currentFetchFunc = path.fetchFunc ?? null;

  if (!currentFetchFunc) {
    const galleryMarkup = pathObject[pathName].render();
    renderPage(galleryMarkup, pathName);
    return null;
  }

  try {
    const galleryData = await currentFetchFunc(page, null);

    const galleryMarkup = pathObject[pathName].render(pathName, galleryData);

    renderPage(galleryMarkup, pathName);
  } catch (err) {
    errorToaster({ message: `Something's gone wrong` });
    console.log(err);
  }
}

export async function openGalleryByGenres(
  page,
  genreIdArr,
  sortBy = SORTBY.POPULARITY,
  order = ORDER.DESC,
) {
  // const { sortBy, order } = appState;
  // let sortByQuery = sortBy ? null : SORTBY.POPULARITY;
  // if (!sortByQuery) {
  //   sortByQuery = sortBy ? sortBy : sortBy;
  // }

  // let orderQuery =
  //   order && (ORDER.ASC === order || ORDER.DESC === order) ? order : ORDER.DESC;

  const pathName = "genres";

  // setUrlInfo({
  //   pathName,
  //   genres: genreIdArr,
  //   page,
  //   sortBy,
  //   order,
  // });

  navigate({
    pathName,
    genres: genreIdArr,
    page,
    sortBy,
    order,
  });

  try {
    const galleryData = await getMoviesByGenre(page, genreIdArr, sortBy, order);

    currentFetchFunc = (page) =>
      pathObject[pathName].fetchFunc(page, genreIdArr, sortBy, order);

    let searchedGenreNames = "";
    const searchedGenreNamesArr = [];
    genresListData.genres.forEach((genre) => {
      const normalizedGenreId = Number(genre.id);
      if (genreIdArr.includes(normalizedGenreId)) {
        searchedGenreNames += genre.name + " ";
        searchedGenreNamesArr.push(genre.name);
      }
    });

    const galleryMarkup = searchedByGenresPage(searchedGenreNames, galleryData);

    renderPage(galleryMarkup, "genres");
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

    renderPage(markup, pathName);
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

    const markup = queuePage(filmData);

    renderPage(markup, pathName);
    return filmData;
  } catch (error) {
    console.error("Failed to open saved gallery:", error);
    errorToaster({ message: "Something went wrong, try later" });
  }
}

export async function drawDefaultPage() {
  const { pathName } = appState;
  if (pathName === "queue") {
    const result = await loaderInterface(() => openSavedGallery(1, pathName));
    return result;
  }

  const markup = pathObject[pathName].render();

  renderPage(markup, pathName);
}

function renderPage(markup, title) {
  mainRef().innerHTML = markup;
  changeActiveNavLinkColor();
  changeTitleText(title);
  successToaster({ message: "Successful!" });
  listenersReload();
}

export function navigate(newValuesObj) {
  setState(newValuesObj);
  setUrlInfo(newValuesObj);

  console.log("appState: ", appState);
}
