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

function appInit() {
  const root = appRootRef("app");
  if (!mainRef())
    root.insertAdjacentElement("afterbegin", document.createElement("main"));
  root.insertAdjacentHTML("afterbegin", headerMarkup());
  const main = mainRef();
  drawMarkupFromPageURL();
}

export function drawMarkupFromPageURL(targetURL = document.URL) {
  const actualPath = window.location.pathname;

  const targetLocation = new URL(targetURL);
  const targetPath = targetLocation.pathname;

  let pathName = targetPath === "/" ? "home" : targetPath.slice(1);
  if (!pathObject[pathName]) {
    pathName = "home";
    setUrlInfo({ pathName });
    // here can be usage of setFilmCardUrlInfo and return
  }
  if (!targetLocation.search) {
    setUrlInfo({ pathName });
  }

  const { searchQuery, page } = getUrlInfo();
  if (
    actualPath !== targetPath
    // ?
    //page
  ) {
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
    changeTitleText(pathName);
    listenersReload();
    setUrlInfo({ searchQuery: null, page: null, pathName });

    return;
  }

  if (!searchQuery) {
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
    changeTitleText(pathName);
    setUrlInfo({ searchQuery, page, pathName });

    listenersReload();
    return;
  } else {
    drawFetchedGalleryPage(page || 1, searchQuery);
    setUrlInfo({ searchQuery: searchQuery, page: page, pathName: "movies" });
    listenersReload();
  }
}

export function drawFetchedGalleryPage(page = 1, searchQuery) {
  getMoviesByTitle(page, searchQuery)
    .catch(console.log)
    .then((galleryData) => {
      setUrlInfo({ pathName: "movies", searchQuery, page });

      const galleryMarkup = searchedMoviesPage(searchQuery, galleryData);
      document.querySelector("main").innerHTML = galleryMarkup;
      listenersReload();

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
  // console.log(page, genreIdArr);
  getMoviesByGenre(page, genreIdArr).then((galleryData) => {
    const genreIdArrString = genreIdArr.join(",");
    setUrlInfo({ pathName: "movies", genreIdArrString, page });

    console.log(genreIdArr);
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

// const pathName = "/random";
// const searchQuery = "testQuery";
// const page = 2;
// const genresArr = [1, 2, 3];
// const sortBy = "";
// const order = "desc";

// setUrlInfo({
//   pathName,
//   searchQuery,
//   page,
//   genresArr,
//   sortBy,
//   order,
// });

console.log(getUrlInfo());
setUrlInfo(getUrlInfo());
