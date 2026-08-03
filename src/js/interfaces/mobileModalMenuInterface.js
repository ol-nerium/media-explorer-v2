import { mobileModalMenuMarkup } from "../components/mobileModalMenu";
import { clickOnNavLink } from "../interfaces/headerInterface";
import {
  backdropRef,
  mobileModalMenuRef,
  modalCloseBtnRef,
} from "../services/refs";

export function onMobHeaderBtnClick(evt) {
  const target = evt.target.closest("button");

  if (!target) return;
  const btnControl = target.dataset?.control;
  if (btnControl === "openMobileMenu") openModal();
}

let backdrop = null;
let modalCloseBtn = null;
let mobileModalMenu = null;
function openModal() {
  backdrop = backdropRef();

  backdrop.classList.remove("is-hidden");
  backdrop.insertAdjacentHTML("afterbegin", mobileModalMenuMarkup());

  modalCloseBtn = modalCloseBtnRef();
  mobileModalMenu = mobileModalMenuRef();

  modalCloseBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onKeyClose);

  mobileModalMenu.addEventListener("click", modaleMenuIntarface);
}

function closeModal() {
  mobileModalMenu.removeEventListener("click", modaleMenuIntarface);
  backdrop.removeEventListener("click", onBackdropClick);
  window.removeEventListener("keydown", onKeyClose);
  modalCloseBtn.removeEventListener("click", closeModal);

  backdrop.classList.add("is-hidden");
  backdrop.innerHTML = "";
}

function onBackdropClick(evt) {
  if (evt.target === evt.currentTarget) closeModal();
}

function onKeyClose(evt) {
  if (evt.code === "Escape") closeModal();
}

function modaleMenuIntarface(evt) {
  clickOnNavLink(evt);
  const isLinkClicked = !!evt.target.closest("a");
  if (isLinkClicked) closeModal();
}
