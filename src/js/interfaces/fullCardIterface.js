import { changeQuequeBtnTextByFilmId } from "../utils";
import { toggleValueFromLSKey } from "../utils/localStorage";
import { handleLocation, pathObject } from "../services/routing";
import { closeModal } from "./modalInterface";
import { getUrlInfo } from "../services/urlInfoService";

import { openVideosWindow } from "./videosInterface";
import { hideLoader, showLoader } from "./notificationInterface";

const CONTROLS = {
  SHOWTRAILER: "showTrailer",
  ADDTOWATCHLIST: "addToWatchlist",
};
export function fullCardBtnInterface(evt) {
  if (evt.currentTarget.nodeName !== "BUTTON") return;

  const dataControl = evt.currentTarget.dataset.control;
  const section = evt.currentTarget.closest("section");
  const filmid = Number(section?.children[0]?.dataset?.filmid);
  if (!filmid) return;
  showLoader();
  if (dataControl === CONTROLS.SHOWTRAILER) {
    openVideosWindow(filmid);
  }
  if (dataControl === CONTROLS.ADDTOWATCHLIST) {
    toggleValueFromLSKey(filmid, "quequeFilmsList");
    changeQuequeBtnTextByFilmId(filmid);
  }

  hideLoader();
}

export function fullCardNavInterface(evt) {
  evt.preventDefault();
  const link = evt?.target?.closest("a");

  if (link) {
    const { pathName } = getUrlInfo();
    const linkUrl = new URL(link.href);
    if (pathObject[linkUrl.pathname.slice(1) || "home"].name === pathName) {
      closeModal();
      return;
    }
    showLoader();
    handleLocation(link.href);
    hideLoader();
  }

  const linkIsClicked = !!link;

  let backBtn = null;
  if (evt.target.nodeName === "BUTTON") backBtn = evt.target;
  if (evt.target?.closest("button")) backBtn = evt.target.closest("button");

  if (backBtn?.classList?.contains("back-btn") || linkIsClicked) closeModal();
}
