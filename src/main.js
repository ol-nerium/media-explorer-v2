import "./style.css";
import { headerMarkup } from "./js/components/header";

import { searchedMoviesPage } from "./js/routes/movies";
import { getUrlInfo, pathObject, setUrlInfo } from "./js/services/routing";

import { fullCardMarkup } from "./js/components/fullCard";

import {
  listenersReload,
  appRootRef,
  genresChipsRootRef,
  headerRootRef,
  mainRef,
  mobileLayoutRef,
  refs,
  sortingDropdownRef,
} from "./js/services/refs";
import { changeTitleText, genresListData } from "./js/utils";
import {
  getCreditsByFilmId,
  getMovieById,
  getMoviesByGenre,
  getMoviesByTitle,
  getReviewsByFilmId,
  getSimilarMoviesById,
} from "./js/services/apiService";

export const navListIcons = {
  logo: `<svg class="icon">
            <use xlink:href="./src/svgSprite.svg#Logo-icon"></use>
          </svg>`,
  home: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-home"></use>
              </svg>`,
  movies: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>`,
  genres: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-saved"></use>
              </svg>`,
  popular: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>`,
  "top rated": `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>`,
  upcoming: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>`,
  favorites: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>`,
  queue: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-queue"></use>
              </svg>`,
  settings: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-settings"></use>
              </svg>`,
  logout: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-logout"></use>
              </svg>`,
};

export const ORDER = {
  ASC: "asc",
  DESC: "desc",
};
export const SORTBY = {
  ORIGINAL_TITLE: "original_title",
  POPULARITY: "popularity",
  REVENUE: "revenue",
  RELEASE_DATE: "primary_release_date",
  TITLE: "title",
  VOTE_AVG: "vote_average",
  VOTE_COUNT: "vote_count",
};

let root;
let main;
function appInit() {
  root = appRootRef("app");
  if (!mainRef())
    root.insertAdjacentElement("afterbegin", document.createElement("main"));
  root.insertAdjacentHTML("afterbegin", headerMarkup());
  main = mainRef();

  window.addEventListener("popstate", (e) => console.log(e));

  drawMarkupFromPageURL();
}

appInit();

export function drawMarkupFromPageURL(targetURL = null) {
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

  const { pathName, search, page, genres } = getUrlInfo();

  console.log(pathName, search, page, genres);

  if (!pathObject[pathName]) {
    const targetPathName = "home";

    setUrlInfo({ pathName: targetPathName });
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[targetPathName].func());
    changeTitleText(targetPathName);
    listenersReload();
    return;
  }

  setUrlInfo({ pathName, search, page, genres });
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
  //   drawFetchedGalleryPage(page || 1, searchQuery);
  //   setUrlInfo({ search: searchQuery, page: page, pathName: "movies" });
  //   listenersReload();
  // }
}

export function drawFetchedGalleryPage(page = 1, searchQuery) {
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

export function openFilmCard(filmId) {
  if (!filmId) {
    console.log("no film id");
    return;
  }

  Promise.all([
    getMovieById(filmId),
    getCreditsByFilmId(filmId),
    getReviewsByFilmId(filmId),
    getSimilarMoviesById(filmId),
  ]).then(([mainData, credits, reviews, similar]) => {
    const filmData = { mainData, credits, reviews, similar };
    const filmCardMarkup = fullCardMarkup(filmData);
    root.innerHTML = filmCardMarkup;
    listenersReload();
  });
}

export function openGalleryByGenres(page, genreIdArr) {
  getMoviesByGenre(page, genreIdArr).then((galleryData) => {
    const genreIdArrString = genreIdArr.join(",");
    setUrlInfo({ pathName: "genres", genreIdArrString, page });

    let searchedGenreNames = "";
    genresListData.genres.forEach((genre) => {
      if (genreIdArr.includes(JSON.stringify(genre.id)))
        searchedGenreNames += genre.name + " ";
    });
    const galleryMarkup = searchedMoviesPage(searchedGenreNames, galleryData);
    document.querySelector("main").innerHTML = galleryMarkup;
    listenersReload();
  });
}
