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

let pathName = "";
let search = "";
let page = "";
let sortBy = "";
let order = "";
let genres = [];

let filmId = "";

let main;

export let activeGenresArr = [];

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
  ({ pathName, search, page, genres } = getUrlInfo());
  const newPath = pathName + "?filmId=" + filmId;

  let newURL =
    window.location.protocol + "//" + window.location.host + "/" + newPath;

  window.history.pushState({ path: newURL }, "", newURL);
}

export async function handleLocation(targetURL = null) {
  main = mainRef();
  ({ pathName, search, page, genres, filmId, sortBy, order } =
    await getUrlInfo());
  if (genres.length > 0) {
    activeGenresArr = genres;
  } else activeGenresArr = [];

  toTop();
  console.log(pathName, search, page, genres, filmId, sortBy, order);
  if (targetURL) {
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

    if (targetPathName === "favorites" || targetPathName === "queue") {
      const result = await loaderInterface(() =>
        openSavedGallery(page, targetPathName),
      );
      return result;
    }

    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[targetPathName].func());
    changeTitleText(targetPathName);
    changeActiveNavLinkColor();
    listenersReload();

    return;
  }

  if (filmId) {
    await loaderInterface(() => openFilmCard(filmId));
  } else closeModal();

  if (!pathObject[pathName]) {
    const targetPathName = "home";

    setUrlInfo({ pathName: targetPathName });
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[targetPathName].func());
    changeTitleText(targetPathName);
    activeGenresArr = []; //?
    changeActiveNavLinkColor();

    listenersReload();
    return;
  }

  await loaderInterface(() =>
    drawMarkupFromUrlParams({
      pathName,
      search,
      page,
      genres,
      filmId,
      sortBy,
      order,
    }),
  );
}

async function drawMarkupFromUrlParams({
  pathName,
  search,
  page,
  genres,
  filmId,
  sortBy,
  order = ORDER.DESC,
}) {
  let result = null;

  if (pathName === "home" || !pathObject[pathName]) return null;

  if (pathName === "movies" && search) {
    result = await loaderInterface(() => openFetchedGalleryPage(page, search));
    return result;
  }

  if (pathName === "movies" && !search) {
    pathObject[pathName].fetchFunc = defaultMoviesFetchFunc;

    if (page && page > 0) {
      setUrlInfo({ pathName, page });

      result = await loaderInterface(() =>
        openFetchedByPathName(page, pathName),
      );
    } else {
      result = await loaderInterface(() => drawDefaultPage());
    }

    return result;
  }

  if (pathName === "genres" && genres?.length < 1) {
    setUrlInfo({ pathName });
    result = await loaderInterface(() => drawDefaultPage());
    return result;
  }
  if (pathName === "genres" && genres?.length > 0) {
    page = page ? page : 1;

    result = await loaderInterface(() =>
      openGalleryByGenres(page, genres, sortBy, order),
    );

    changeCheckedSortSelect();

    return result;
  }

  if (
    pathName === "popular" ||
    pathName === "toprated" ||
    pathName === "upcoming"
  ) {
    if (page && page > 0) {
      setUrlInfo({ pathName, page });
      result = await loaderInterface(() =>
        openFetchedByPathName(page, pathName),
      );
    } else result = await loaderInterface(() => drawDefaultPage());
  }

  if (pathName === "favorites" || pathName === "queue") {
    result = await loaderInterface(() => openSavedGallery(page, pathName));
  }
}

export async function openFetchedGalleryPage(page = 1, searchQuery) {
  try {
    console.log(page, searchQuery, "!!!");
    const galleryData = await getMoviesByTitle(page, searchQuery);
    pathName = "movies";
    setUrlInfo({ pathName, search: searchQuery, page });
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

  // getMoviesByTitle(page, searchQuery)
  // .catch((err) => {
  // errorToaster({ message: `Something's gone wrong` });
  // console.log(err);
  // })
  // .then((galleryData) => {
  // pathName = "movies";
  // setUrlInfo({ pathName, search: searchQuery, page });
  // pathObject[pathName].fetchFunc = (page) =>
  //   getMoviesByTitle(page, searchQuery);
  // const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);
  // mainRef().innerHTML = galleryMarkup;
  // changeActiveNavLinkColor();
  // changeTitleText(`Movies search`);
  // successToaster({ message: "Successful!" });
  // infoToaster({ message: `Search for "${searchQuery}", page ${page}` });
  // listenersReload();
  // });
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
  if (pathName === "queue") {
    const result = await loaderInterface(() => openSavedGallery(1, pathName));
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
