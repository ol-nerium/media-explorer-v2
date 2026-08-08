import "./style.css";
import { headerMarkup } from "./js/components/header";

import { searchedMoviesPage } from "./js/routes/movies";
import {
  drawMarkupFromPageURL,
  getUrlInfo,
  pathObject,
  setUrlInfo,
} from "./js/services/routing";

import { fullCardMarkup } from "./js/components/fullCard";

import { listenersReload, appRootRef, mainRef } from "./js/services/refs";
import { changeTitleText, genresListData } from "./js/utils";
import {
  getCreditsByFilmId,
  getMovieById,
  getMoviesByGenre,
  getMoviesByTitle,
  getReviewsByFilmId,
  getSimilarMoviesById,
} from "./js/services/apiService";
import { openFilmCard } from "./js/interfaces/openFullFilmCard";

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

  window.addEventListener("popstate", (e) => {
    console.log(e);
    drawMarkupFromPageURL();
  });

  drawMarkupFromPageURL();
}

appInit();
