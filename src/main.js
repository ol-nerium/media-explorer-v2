import "./style.css";
import { headerMarkup } from "./js/sectionCreate";

import {
  homePage,
  moviesPage,
  genresPage,
  watchlistPage,
  historyPage,
  favoritesPage,
  queuePage,
} from "./js/routingMarkup";

const pathObject = {
  home: { path: "/", func: homePage },
  movies: { path: "/movies", func: moviesPage },
  genres: { path: "/genres", func: genresPage },
  watchlist: { path: "/watchlist", func: watchlistPage },
  history: { path: "/history", func: historyPage },
  favorites: { path: "/favorites", func: favoritesPage },
  queue: { path: "/queue", func: queuePage },
  settings: {
    path: "/settings",
    func: () => {
      console.log("here could be settings page");
    },
  },
  logout: {
    path: "/logout",
    func: () => {
      console.log("here could be logout");
    },
  },
};

const root = document.getElementById("app");
root.insertAdjacentHTML("afterbegin", headerMarkup());

const headerRoot = document.querySelector(".header");
headerRoot.addEventListener("click", clickOnHeaderLink);

function clickOnHeaderLink(evt) {
  evt.preventDefault();
  const link = evt.target.closest("a");
  if (!link) return;

  drawMarkupFromPageName(link.href);
}

function drawMarkupFromPageName(urlPath = document.URL) {
  const url = new URL(urlPath);
  const actualPath = window.location.pathname;
  const passedPath = url.pathname;
  const sameLink = actualPath === passedPath;

  // console.log("actualPath: ", actualPath);
  // console.log("passed url", passedPath);
  // console.log("click on same link ", sameLink);

  const pathName = url.pathname === "/" ? "home" : url.pathname.slice(1);

  let newURL =
    window.location.protocol +
    "//" +
    window.location.host +
    pathObject[pathName].path;

  window.history.pushState({ path: newURL }, "", newURL);

  let main = document.querySelector("main");

  if (!main) {
    const mainElement = document.createElement("main");
    root.insertAdjacentElement("afterbegin", mainElement);
    main = document.querySelector("main");
  }

  if (!sameLink) {
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
  }
}

function firstLoad() {
  const actualPath = window.location.pathname;

  const pathName = actualPath === "/" ? "home" : actualPath.slice(1);

  let main = document.querySelector("main");
  if (!main) {
    const mainElement = document.createElement("main");
    root.insertAdjacentElement("afterbegin", mainElement);
    main = document.querySelector("main");
  }
  main.insertAdjacentHTML("afterbegin", pathObject[pathName].func());
}

firstLoad();
