import { mobileModalMenuMarkup } from "../components/mobileModalMenu";
import { clickOnNavLink } from "../interfaces";
import { mobileModalMenuRef, modalCloseBtnRef } from "../services/refs";
import { toggleTheme } from "../interfaces";
import { closeModal, openModal } from "../interfaces";

let modalCloseBtn = null;
let mobileModalMenu = null;

export function onMobHeaderBtnClick(evt) {
  const target = evt.target.closest("button");

  if (!target) return;
  const btnControl = target.dataset?.control;
  if (btnControl === "openMobileMenu") openModal(mobileModalMenuMarkup());
  if (btnControl === "changeColorTheme") toggleTheme();
}

export function addMobileModalMenuListeners() {
  modalCloseBtn = modalCloseBtnRef();
  mobileModalMenu = mobileModalMenuRef();

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (mobileModalMenu)
    mobileModalMenu.addEventListener("click", modaleMenuInterface);
}
export function removeMobileModalMenuListeners() {
  if (modalCloseBtn)
    mobileModalMenu.removeEventListener("click", modaleMenuInterface);
  if (mobileModalMenu) modalCloseBtn.removeEventListener("click", closeModal);
}

function modaleMenuInterface(evt) {
  clickOnNavLink(evt);
  const isLinkClicked = !!evt.target.closest("a");
  if (isLinkClicked) closeModal();
}
