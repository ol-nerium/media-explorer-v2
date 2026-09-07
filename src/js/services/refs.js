import {
  heroInterface,
  onMobHeaderBtnClick,
  clickOnNavLink,
  onSearchFormSubmit,
  onSelectChange,
  genreChipsInterface,
  mobileGenresInterface,
  clickOnGalleryCardInterface,
  paginationInterface,
  genresSectionInterface,
  savedGalleryInterface,
  fullCardBtnInterface,
  fullCardNavInterface,
  themeChangeInterface,
  toTop,
} from "../interfaces";

export const appRootRef = () => document.getElementById("app");
export const mainRef = () => document.querySelector("main");

export const headerRootRef = () => document.querySelector(".header");
export let headerMenuRef = () => document.querySelector(".header-menu-layout");

export const mobileLayoutRef = () =>
  document.querySelector(".mobile-header-layout");
export const genresChipsRootRef = () => document.querySelector(".genres-chips");
export const sortingDropdownRef = () =>
  document.getElementById("sortingDropdown");

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

export const topBtnRef = () => document.querySelector(".toTopBtn");
export const loaderRef = () => document.querySelector(".loader");
export const toastContainerRef = () =>
  document.querySelector(".toast-container");

export const videoContentRef = () => document.querySelector(".videos-content");

export const heroRef = () => document.querySelector(".hero");
const mainHeadingRef = () => document.querySelector(".main-heading");
const mobileGenresRef = () => document.querySelector(".mobile-genres");
const sliderGallerySectionPopularRef = () =>
  document.querySelector(".slider-gallery.popular");
const sliderGallerySectionTopRatedRef = () =>
  document.querySelector(".slider-gallery.top-rated");
const sliderGallerySectionUpComingRef = () =>
  document.querySelector(".slider-gallery.upcoming");
const sliderGallerySectionFullCardRef = () =>
  document.querySelector(".full-card-gallery");

const mainGalleryRef = () => document.querySelector(".main-gallery");
const paginationRef = () => document.querySelector(".pagination");
const genresSectionRef = () => document.querySelector(".genresSection");
const savedGalleryRef = () => document.querySelector(".saved-gallery");

const searchbarFormRef = () => document.querySelector(".searchbar-form");
const fullCardRef = () => document.querySelector(".full-card");
const fullCardtrailerBtn = () =>
  fullCardRef()?.querySelector('[data-control="showTrailer"]');
const fullCardaddToQuequeBtn = () =>
  fullCardRef()?.querySelector('[data-control="addToWatchlist"]');
const fullCardNavRef = () => document.querySelector(".full-card-nav");

export const refs = {
  topBtn: {
    elem: topBtnRef,
    func: toTop,
    eventType: "click",
  },
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

  fullCardTrailerBtn: {
    elem: fullCardtrailerBtn,
    func: fullCardBtnInterface,
    eventType: "click",
  },
  fullCardAddToQuequeBtn: {
    elem: fullCardaddToQuequeBtn,
    func: fullCardBtnInterface,
    eventType: "click",
  },

  mainHeadingButtons: {
    elem: mainHeadingRef,
    func: themeChangeInterface,
    eventType: "click",
  },

  mainPageInfo: {
    elem: mainPageInfoRef,
    func: clickOnNavLink,
    eventType: "click",
  },
  fullCardNav: {
    elem: fullCardNavRef,
    func: fullCardNavInterface,
    eventType: "click",
  },
  mainGallery: {
    elem: mainGalleryRef,
    func: clickOnGalleryCardInterface,
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
