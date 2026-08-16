import { changeQuequeBtnTextByFilmId } from "../utils";
import { toggleValueFromLSKey } from "../services/localStorageService";
import {
  handleLocation,
  openSavedGallery,
  pathObject,
} from "../services/routing";
import { closeModal } from "./modalInterface";
import { getUrlInfo } from "../services/urlInfoService";

import { openVideosWindow } from "./videosInterface";
import { hideLoader, showLoader } from "./loaderInterface";
import { errorToaster, successToaster } from "./toaster";

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
  // showLoader();
  if (dataControl === CONTROLS.SHOWTRAILER) {
    openVideosWindow(filmid);
  }
  if (dataControl === CONTROLS.ADDTOWATCHLIST) {
    showLoader();
    const { saved, removed } = toggleValueFromLSKey(filmid, "quequeFilmsList");
    changeQuequeBtnTextByFilmId(filmid);
    if (saved) successToaster({ message: "Film added to queque" });
    if (removed) {
      const { pathName } = getUrlInfo();
      if (pathName === pathObject.queue.name) {
        openSavedGallery(1, pathName);
      }
      errorToaster({ message: "Film removed from queque" });
    }
    hideLoader();
  }

  // hideLoader();
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
