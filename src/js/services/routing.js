import { closeModal } from "../interfaces/modalInterface";
import { openFilmCard } from "../interfaces/openFullFilmCard";

import { favoritesPage } from "../routes/favorites";
import { genresPage, searchedByGenresPage } from "../routes/genres";
import { homePage } from "../routes/home";
import { logoutPage } from "../routes/logout";
import { moviesPage, searchedMoviesPage } from "../routes/movies";
import { popularPage } from "../routes/popular";
import { queuePage } from "../routes/queque";
import { settingsPage } from "../routes/settings";
import { topRatedPage } from "../routes/toprated";
import { upcomingPage } from "../routes/upcoming";
import {
  changeActiveNavLinkColor,
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

  favorites: {
    path: "/favorites",
    name: "favorites",
    func: favoritesPage,
    fetchFunc: fetchResultsByIds,
  },
  queue: {
    path: "/queue",
    name: "queue",
    func: queuePage,
    fetchFunc: fetchResultsByIds,
  },
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

export function setFilmCardUrlInfo(filmId) {
  // const { genres, page, pathName, search } = getUrlInfo();
  ({ pathName, search, page, genres } = getUrlInfo());
  console.log(filmId);
  const newPath = pathName + "?filmId=" + filmId;

  let newURL =
    window.location.protocol + "//" + window.location.host + "/" + newPath;

  window.history.pushState({ path: newURL }, "", newURL);
}

export function handleLocation(targetURL = null) {
  // console.log(targetURL);
  main = mainRef();
  ({ pathName, search, page, genres, filmId, sortBy, order } = getUrlInfo());
  if (genres.length > 0) {
    activeGenresArr = genres;
  } else activeGenresArr = [];

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
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[targetPathName].func());

    changeTitleText(targetPathName);

    changeActiveNavLinkColor();

    listenersReload();

    return;
  }

  if (!pathObject[pathName]) {
    console.log(pathObject[pathName]);
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

  if (filmId) {
    openFilmCard(filmId);
  } else closeModal();

  // setUrlInfo({ pathName, search, page, genres, filmId });

  // main.innerHTML = "";
  // here should be handling if there are something in the url that will change behaviour and fetch another page than default
  // main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
  // changeTitleText(pathName);
  // listenersReload();

  // console.log(pathName, search, page, genres, filmId, sortBy, order);

  drawMarkupFromUrlParams({
    pathName,
    search,
    page,
    genres,
    filmId,
    sortBy,
    order,
  });
}

// function handleHomePageLocation() {}
// function handleMoviesPageLocation() {}
// function handleGenresPageLocation() {}

// function drawMarkupFromNavLinkClick() {}

function drawMarkupFromUrlParams({
  pathName,
  search,
  page,
  genres,
  filmId,
  sortBy,
  order,
}) {
  console.log(pathName, search, page, genres, filmId, sortBy, order);

  if (pathName === "home" || !pathObject[pathName]) return;

  if (pathName === "movies" && search) {
    openFetchedGalleryPage(page, search);
    return;
  }

  if (pathName === "movies" && !search) {
    pathObject[pathName].fetchFunc = defaultMoviesFetchFunc;

    if (page && page > 0) {
      setUrlInfo({ pathName, page });

      openFetchedByPathName(page, pathName);
    } else drawDefaultPage();

    // changeActiveNavLinkColor();
    return;
  }

  if (pathName === "genres" && genres?.length < 1) {
    console.log(genres);
    setUrlInfo({ pathName });
    drawDefaultPage();
    // changeActiveNavLinkColor();
    return;
  }
  if (pathName === "genres" && genres?.length > 0) {
    console.log(genres);
    page = page ? page : 1;
    console.log(page);
    setUrlInfo({ pathName, page, genres });
    openGalleryByGenres(
      page,
      genres,
      (sortBy = "popularity"),
      (order = "desc"),
    );
    // changeActiveNavLinkColor();
    return;
  }

  if (
    pathName === "popular" ||
    pathName === "toprated" ||
    pathName === "upcoming"
  ) {
    if (page && page > 0) {
      setUrlInfo({ pathName, page });

      openFetchedByPathName(page, pathName);
      // changeActiveNavLinkColor();
    } else drawDefaultPage();
  }

  if (pathName === "favorites" || pathName === "queue") {
    if (page && page > 0) {
      setUrlInfo({ pathName, page });

      openSavedGallery(page, pathName);
      // changeActiveNavLinkColor();
    } else drawDefaultPage();
  }
}

export function openFetchedGalleryPage(page = 1, searchQuery) {
  getMoviesByTitle(page, searchQuery)
    .catch(console.log)
    .then((galleryData) => {
      pathName = "movies";
      setUrlInfo({ pathName, search: searchQuery, page });
      pathObject[pathName].fetchFunc = (page) =>
        getMoviesByTitle(page, searchQuery);

      const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);
      document.querySelector("main").innerHTML = galleryMarkup;
      changeActiveNavLinkColor();
      listenersReload();

      console.log(window.history.state);
    });
}

export function openFetchedByPathName(page = 1, pathName) {
  const fetchFunc = pathObject[pathName]
    ? pathObject[pathName].fetchFunc
    : null;
  if (fetchFunc) {
    fetchFunc(page)
      .catch(console.log)
      .then((galleryData) => {
        // setUrlInfo({ pathName, page });
        pathObject[pathName].fetchFunc = (page) =>
          fetchFunc(page, `search for ${pathName}`);

        // const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);
        const galleryMarkup = pathObject[pathName].func(pathName, galleryData);
        document.querySelector("main").innerHTML = galleryMarkup;
        changeActiveNavLinkColor();
        listenersReload();

        // can be doubling code
      });
  } else {
    const galleryMarkup = pathObject[pathName].func();
    document.querySelector("main").innerHTML = galleryMarkup;
    changeActiveNavLinkColor();
    listenersReload();
  }
}

export function openGalleryByGenres(
  page,
  genreIdArr,
  sortBy = "popularity",
  order = "desc",
) {
  getMoviesByGenre(page, genreIdArr, sortBy, order).then((galleryData) => {
    // const genreIdArrString = genreIdArr.join(",");
    setUrlInfo({
      pathName: "genres",
      genres: genreIdArr,
      page,
      sortBy,
      order,
    });

    pathObject["genres"].fetchFunc = (page) =>
      getMoviesByGenre(page, genreIdArr, sortBy, order);

    let searchedGenreNames = "";
    genresListData.genres.forEach((genre) => {
      if (genreIdArr.includes(JSON.stringify(genre.id)))
        searchedGenreNames += genre.name + " ";
    });
    const galleryMarkup = searchedByGenresPage(searchedGenreNames, galleryData);
    document.querySelector("main").innerHTML = galleryMarkup;

    changeActiveNavLinkColor();
    listenersReload();
  });
}

export function openSavedGallery(page, pathName) {
  console.log(page, pathName, "nothing for now, need update");
}

export function drawDefaultPage() {
  main.innerHTML = "";
  // here should be handling if there are something in the url that will change behaviour and fetch another page than default
  main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
  changeTitleText(pathName);

  changeActiveNavLinkColor();
  listenersReload();
}
