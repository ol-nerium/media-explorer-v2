import { heroInterface } from "../heroInterface";
import { onMobHeaderBtnClick } from "../mobileModalMenu";
import { clickOnNavLink } from "../routingMarkup";
import { genreChipsInterface, onSelectChange } from "../sorting";

const appRootRef = () => document.getElementById("app");
const mainRef = () => document.querySelector("main");

let headerRootRef = () => document.querySelector(".header");
let mobileLayoutRef = () => document.querySelector(".mobile-header-layout");
let genresChipsRootRef = () => document.querySelector(".genres-chips");
let sortingDropdownRef = () => document.getElementById("sortingDropdown");
let heroRef = () => document.querySelector(".hero");

export function reloadRefs() {
  headerRootRef = () => document.querySelector(".header");
  mobileLayoutRef = () => document.querySelector(".mobile-header-layout");
  genresChipsRootRef = () => document.querySelector(".genres-chips");
  sortingDropdownRef = () => document.getElementById("sortingDropdown");
  heroRef = () => document.getElementById("sortingDropdown");
}

export const refs = {
  header: { elem: headerRootRef, func: clickOnNavLink, eventType: "click" },
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
