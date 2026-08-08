import { appRootRef, backdropRef, mainRef } from "../services/refs";
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

  // refresing listeners if multiple cards open in the row
  // removeMobileModalMenuListeners();
  // backdrop.removeEventListener("click", onBackdropClick);
  // window.removeEventListener("keydown", onKeyClose);
  // check if it necessary at all

  addMobileModalMenuListeners();
  backdrop.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onKeyClose);

  document.querySelector("body").style.overflow = "hidden";
}
function onBackdropClick(evt) {
  if (evt.target === evt.currentTarget) closeModal();
}
function onKeyClose(evt) {
  console.log(evt);
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
}
