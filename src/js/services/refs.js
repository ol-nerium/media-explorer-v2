import { heroInterface } from "../interfaces/heroInterface";
import { onMobHeaderBtnClick } from "../interfaces/mobileModalMenuInterface";
import { clickOnNavLink, onSearchFormSubmit } from "../interfaces";
import { onSelectChange } from "../interfaces/dropdownInterface";

import {
  genreChipsInterface,
  mobileGenresInterface,
} from "../interfaces/genresInterface";
import { clickOnGalleryCardInterface } from "../interfaces/clickOnGalleryCardInterface";
import { mainGalleryInterface } from "../interfaces/mainGalleryInterface";
import { paginationInterface } from "../interfaces/paginationInterface";
import { genresSectionInterface } from "../interfaces/genresInterface";
import { savedGalleryInterface } from "../interfaces/savedGalleryInterface";
import {
  fullCardInterface,
  fullCardNavInterface,
} from "../interfaces/fullCardIterface";
import { mainPageInfoInterface } from "../interfaces/mainPageInfoInterface";

const appRootRef = () => document.getElementById("app");
const mainRef = () => document.querySelector("main");

let headerRootRef = () => document.querySelector(".header");
let headerMenuRef = () => document.querySelector(".header-menu-layout");

let mobileLayoutRef = () => document.querySelector(".mobile-header-layout");
// sorting:
let genresChipsRootRef = () => document.querySelector(".genres-chips");
let sortingDropdownRef = () => document.getElementById("sortingDropdown");
//
let heroRef = () => document.querySelector(".hero");

let mainHeadingRef = () => document.querySelector(".main-heading");
let mainHeadingButtonsRef = () =>
  document.querySelector(".main-heading-buttons");
let mobileGenresRef = () => document.querySelector(".mobile-genres");

let sliderGallerySectionPopularRef = () =>
  document.querySelector(".slider-gallery.popular");
let sliderGallerySectionTopRatedRef = () =>
  document.querySelector(".slider-gallery.top-rated");
let sliderGallerySectionUpComingRef = () =>
  document.querySelector(".slider-gallery.upcoming");
let sliderGallerySectionFullCardRef = () =>
  document.querySelector(".full-card-gallery");

export const mainPageInfoRef = () => document.querySelector(".main-page-info");
export const mainPageInfoTitleRef = () =>
  document.querySelector(".main-page-info-title");
export const headerTitle = () => document.querySelector(".headerTitle");
export const heroQuequeBtn = () =>
  document.querySelector(".hero-controls-addToQueque");
export const fullCardWatchlistBtn = () =>
  document.querySelector(".full-card-controls_AddToWatchlist");
export const backdropRef = () => document.querySelector(".backdrop");
export const modalCloseBtnRef = () => document.querySelector(".modal-closeBtn");
export const mobileModalMenuRef = () =>
  document.querySelector(".mobile-modal-menu");

let mainGalleryRef = () => document.querySelector(".main-gallery");
let paginationRef = () => document.querySelector(".pagination");
let genresSectionRef = () => document.querySelector(".genresSection");
let savedGalleryRef = () => document.querySelector(".saved-gallery");

let searchbarFormRef = () => document.querySelector(".searchbar-form");
let fullCardRef = () => document.querySelector(".full-card");
let fullCardtrailerBtn = () =>
  fullCardRef()?.querySelector('[data-control="showTrailer"]');
let fullCardaddToQuequeBtn = () =>
  fullCardRef()?.querySelector('[data-control="addToWatchlist"]');
let fullCardNavRef = () => document.querySelector(".full-card-nav");

export const refs = {
  header: { elem: headerRootRef, func: null, eventType: "click" },
  headerMenu: { elem: headerMenuRef, func: clickOnNavLink, eventType: "click" },
  mobileLayout: {
    elem: mobileLayoutRef,
    func: onMobHeaderBtnClick,
    eventType: "click",
  },
  genresChips: {
    elem: genresChipsRootRef,
    func: genreChipsInterface,
    eventType: "click",
  },
  mobileGenres: {
    elem: mobileGenresRef,
    func: mobileGenresInterface,
    eventType: "click",
  },
  sortingDropdown: {
    elem: sortingDropdownRef,
    func: onSelectChange,
    eventType: "change",
  },
  hero: {
    elem: heroRef,
    func: heroInterface,
    eventType: "click",
  },
  searchbarForm: {
    elem: searchbarFormRef,
    func: onSearchFormSubmit,
    eventType: "submit",
  },

  popular: {
    elem: sliderGallerySectionPopularRef,
    func: clickOnGalleryCardInterface,
    eventType: "click",
  },
  topRated: {
    elem: sliderGallerySectionTopRatedRef,
    func: clickOnGalleryCardInterface,
    eventType: "click",
  },
  upComing: {
    elem: sliderGallerySectionUpComingRef,
    func: clickOnGalleryCardInterface,
    eventType: "click",
  },
  fullCardGallery: {
    elem: sliderGallerySectionFullCardRef,
    func: clickOnGalleryCardInterface,
    eventType: "click",
  },
  //
  // fullCard: {
  //   elem: fullCardRef,
  //   func: fullCardInterface,
  //   eventType: "click",
  // },
  fullCardTrailerBtn: {
    elem: fullCardtrailerBtn,
    func: fullCardInterface,
    eventType: "click",
  },
  fullCardAddToQuequeBtn: {
    elem: fullCardaddToQuequeBtn,
    func: fullCardInterface,
    eventType: "click",
  },

  // you are here

  // mainHeadingButtons: {
  //   elem: mainHeadingButtonsRef,
  //   func: mainHeadingButtonsInterface,
  //   eventType: "click",
  // },

  mainPageInfo: {
    elem: mainPageInfoRef,
    func: mainPageInfoInterface,
    eventType: "click",
  },
  fullCardNav: {
    elem: fullCardNavRef,
    func: fullCardNavInterface,
    eventType: "click",
  },
  mainGallery: {
    elem: mainGalleryRef,
    func: mainGalleryInterface,
    eventType: "click",
  },
  pagination: {
    elem: paginationRef,
    func: paginationInterface,
    eventType: "click",
  },
  genresSection: {
    elem: genresSectionRef,
    func: genresSectionInterface,
    eventType: "click",
  },
  savedGallery: {
    elem: savedGalleryRef,
    func: savedGalleryInterface,
    eventType: "click",
  },
};

const refsKeys = Object.keys(refs);

export const listenersReload = () => {
  for (let i = 0; i < refsKeys.length; i += 1) {
    const element = refs[refsKeys[i]].elem();

    const elemFunc = refs[refsKeys[i]].func;
    const eventType = refs[refsKeys[i]].eventType;
    if (!element) continue;
    element.removeEventListener(eventType, elemFunc);
    element.addEventListener(eventType, elemFunc);
  }
};

export {
  mainRef,
  appRootRef,
  headerRootRef,
  mobileLayoutRef,
  genresChipsRootRef,
  sortingDropdownRef,
};
