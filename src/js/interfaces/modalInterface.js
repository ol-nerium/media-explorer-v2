import { backdropRef } from "../services/refs";
import { getUrlInfo } from "../services/urlInfoService";
import { changeActiveNavLinkColor } from "../utils";
import {
  addMobileModalMenuListeners,
  closeVideosWindow,
  removeMobileModalMenuListeners,
} from "../interfaces";
import { navigate } from "../services/routing";

let backdrop = null;
export function openModal(markup) {
  backdrop = backdropRef();
  backdrop.innerHTML = "";
  backdrop.classList.remove("is-hidden");
  backdrop.insertAdjacentHTML("afterbegin", markup);

  addMobileModalMenuListeners();
  backdrop.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onKeyClose);

  document.body.style.overflow = "hidden";
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

  closeVideosWindow();

  backdrop.removeEventListener("click", onBackdropClick);
  window.removeEventListener("keydown", onKeyClose);

  backdrop.classList.add("is-hidden");
  backdrop.innerHTML = "";
  document.body.style.overflow = "";

  const currentUrlInfo = getUrlInfo();

  navigate({ ...currentUrlInfo, filmId: "" });
}
