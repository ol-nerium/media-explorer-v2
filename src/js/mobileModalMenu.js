import { mobileModalMenuMarkup } from "./components/mobileModalMenu";
import { clickOnNavLink } from "./routingMarkup";

export function onMobHeaderBtnClick(evt) {
  const target = evt.target.closest("button");

  if (!target) return;
  const btnControl = target.dataset?.control;
  console.log(target.dataset?.control);
  if (btnControl === "openMobileMenu") openModal();
}

const backdrop = document.querySelector(".backdrop");
let mobileLinks = null;
function openModal() {
  backdrop.classList.remove("is-hidden");

  backdrop.insertAdjacentHTML("afterbegin", mobileModalMenuMarkup());

  const modalCloseBtn = document.querySelector(".modal-closeBtn");
  modalCloseBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onKeyClose);

  mobileLinks = document.querySelector(".mobile-modal-menu");
  mobileLinks.addEventListener("click", modaleMenuIntarface);
}

function closeModal() {
  mobileLinks.removeEventListener("click", modaleMenuIntarface);
  backdrop.removeEventListener("click", onBackdropClick);
  window.removeEventListener("keydown", onKeyClose);

  backdrop.classList.add("is-hidden");
  backdrop.innerHTML = "";
}

function onBackdropClick(evt) {
  console.log(evt.target);
  if (evt.target === evt.currentTarget) closeModal();
}

function onKeyClose(evt) {
  console.log(evt.code);
  if (evt.code === "Escape") closeModal();
}

function modaleMenuIntarface(evt) {
  clickOnNavLink(evt);
  const isLinkClicked = !!evt.target.closest("a");
  if (isLinkClicked) closeModal();
}
