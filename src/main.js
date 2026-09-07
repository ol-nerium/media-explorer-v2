import "./style.css";
import { headerMarkup } from "./js/components/header";

import { handleLocation } from "./js/services/routing";

import {
  appRootRef,
  listenersReload,
  mainRef,
  topBtnRef,
} from "./js/services/refs";
import { setThemeFromLS } from "./js/interfaces/headerInterface";
import { loaderInterface } from "./js/interfaces/loaderInterface";
import { initToast } from "./js/interfaces/toaster";
import { createToTopBtn, toTop } from "./js/interfaces/scrollInterface";

import spriteUrl from "./assets/svgSprite.svg";

export const navListIcons = {
  logo: `<svg class="icon">
            <use xlink:href="${spriteUrl}#Logo-icon"></use>
          </svg>`,
  home: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-home"></use>
              </svg>`,
  movies: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-heart"></use>
              </svg>`,
  genres: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-saved"></use>
              </svg>`,
  popular: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-films"></use>
              </svg>`,
  "top rated": `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-films"></use>
              </svg>`,
  upcoming: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-films"></use>
              </svg>`,
  favorites: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-heart"></use>
              </svg>`,
  queue: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-queue"></use>
              </svg>`,
  settings: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-settings"></use>
              </svg>`,
  logout: `<svg class="icon">
                <use xlink:href="${spriteUrl}#main-logout"></use>
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

async function appInit() {
  root = appRootRef("app");
  if (!mainRef())
    root.insertAdjacentElement("afterbegin", document.createElement("main"));

  root.insertAdjacentHTML("afterbegin", headerMarkup());
  main = mainRef();

  setThemeFromLS();
  createToTopBtn();
  initToast();

  window.addEventListener("popstate", async (e) => {
    await loaderInterface(() => handleLocation());

    return;
  });

  window.addEventListener("scroll", (e) => {
    if (e.currentTarget.scrollY > 600) {
      topBtnRef()?.classList.remove("hidden");
    } else {
      topBtnRef()?.classList.add("hidden");
    }
  });

  handleLocation();
}

await loaderInterface(() => appInit());
