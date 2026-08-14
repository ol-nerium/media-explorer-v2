import { appRootRef, backdropRef, mainRef } from "../services/refs";
import { getUrlInfo, setUrlInfo } from "../services/urlInfoService";
import { changeActiveNavLinkColor } from "../utils";
import {
  addMobileModalMenuListeners,
  removeMobileModalMenuListeners,
} from "./mobileModalMenuInterface";

let backdrop = null;
export function openModal(markup) {
  backdrop = backdropRef();
  backdrop.innerHTML = "";
  backdrop.classList.remove("is-hidden");
  backdrop.insertAdjacentHTML("afterbegin", markup);

  addMobileModalMenuListeners();
  backdrop.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onKeyClose);

  document.querySelector("body").style.overflow = "hidden";
  changeActiveNavLinkColor();
}
function onBackdropClick(evt) {
  if (evt.target === evt.currentTarget) closeModal();
}
function onKeyClose(evt) {
  if (evt.code === "Escape") closeModal();
}
export function closeModal() {
  backdrop = backdropRef();

  removeMobileModalMenuListeners();
  backdrop.removeEventListener("click", onBackdropClick);
  window.removeEventListener("keydown", onKeyClose);

  backdrop.classList.add("is-hidden");
  backdrop.innerHTML = "";
  document.querySelector("body").style.overflow = "";

  const currentUrlInfo = getUrlInfo();
  setUrlInfo({ ...currentUrlInfo, filmId: "" });
}
