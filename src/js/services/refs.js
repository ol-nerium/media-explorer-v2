import { heroInterface } from "../interfaces/heroInterface";
import { onMobHeaderBtnClick } from "../interfaces/mobileModalMenuInterface";
import { clickOnNavLink } from "../interfaces/headerInterface";
import {
  genreChipsInterface,
  onSelectChange,
} from "../interfaces/sortingInterface";
import {
  mainHeadingButtonsInterface,
  mainHeadingInterface,
} from "../interfaces/mainHeadingInterface";
import { mobileGenresInterface } from "../interfaces/mobileGenresInterface";
import { sliderGalleryInterface } from "../interfaces/sliderGalleryInterface";
import { mainPageInfoInterface } from "../interfaces/mainPageInfoInterface";
import { mainGalleryInterface } from "../interfaces/mainGalleryInterface";
import { paginationInterface } from "../interfaces/paginationInterface";
import { genresSectionInterface } from "../interfaces/genresSectionInterface";
import { savedGalleryInterface } from "../interfaces/savedGalleryInterface";
import { searchbarFormInterface } from "../interfaces/searchbarFormInterface";

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
let sliderGalleryRef = () => document.querySelector(".slider-gallery");
let mainPageInfoRef = () => document.querySelector(".main-page-info");
let mainGalleryRef = () => document.querySelector(".main-gallery");
let paginationRef = () => document.querySelector(".pagination");
let genresSectionRef = () => document.querySelector(".genresSection");
let savedGalleryRef = () => document.querySelector(".saved-gallery");

let searchbarFormRef = () => document.querySelector(".searchbar-form");

// export function reloadRefs() {
//   headerRootRef = () => document.querySelector(".header");
//   mobileLayoutRef = () => document.querySelector(".mobile-header-layout");
//   genresChipsRootRef = () => document.querySelector(".genres-chips");
//   sortingDropdownRef = () => document.getElementById("sortingDropdown");
//   heroRef = () => document.getElementById("sortingDropdown");
// }

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
  // you are here
  // searchbarForm: {
  //   elem: searchbarFormRef,
  //   func: searchbarFormInterface,
  //   eventType: "click",
  // },
  // mainHeading: {
  //   elem: mainHeadingRef,
  //   func: mainHeadingInterface,
  //   eventType: "click",
  // },
  // mainHeadingButtons: {
  //   elem: mainHeadingButtonsRef,
  //   func: mainHeadingButtonsInterface,
  //   eventType: "click",
  // },
  mobileGenres: {
    elem: mobileGenresRef,
    func: mobileGenresInterface,
    eventType: "click",
  },
  sliderGallery: {
    elem: sliderGalleryRef,
    func: sliderGalleryInterface,
    eventType: "click",
  },
  mainPageInfo: {
    elem: mainPageInfoRef,
    func: mainPageInfoInterface,
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
