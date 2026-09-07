import { changeQuequeBtnTextByFilmId } from "../utils";
import { toggleValueFromLSKey } from "../services/localStorageService";
import {
  handleLocation,
  openSavedGallery,
  pathObject,
  setFilmCardUrlInfo,
} from "../services/routing";
import { closeModal } from "./modalInterface";
import { getUrlInfo } from "../services/urlInfoService";

import { openVideosWindow } from "./videosInterface";
import { loaderInterface } from "./loaderInterface";
import { errorToaster, successToaster } from "./toaster";

const CONTROLS = {
  SHOWTRAILER: "showTrailer",
  ADDTOWATCHLIST: "addToWatchlist",
};
export async function fullCardBtnInterface(evt) {
  if (evt.currentTarget.nodeName !== "BUTTON") return;

  const dataControl = evt.currentTarget.dataset.control;
  const section = evt.currentTarget.closest("section");
  const filmid = Number(section?.children[0]?.dataset?.filmid);
  if (!filmid) return;
  if (dataControl === CONTROLS.SHOWTRAILER) {
    await loaderInterface(() => openVideosWindow(filmid));
  }
  if (dataControl === CONTROLS.ADDTOWATCHLIST) {
    await loaderInterface(() => {
      const { saved, removed } = toggleValueFromLSKey(
        filmid,
        "quequeFilmsList",
      );
      changeQuequeBtnTextByFilmId(filmid);
      if (saved) successToaster({ message: "Film added to queque" });
      if (removed) {
        const { pathName } = getUrlInfo();
        if (pathName === pathObject.queue.name) {
          openSavedGallery(1, pathName);
        }
        errorToaster({ message: "Film removed from queque" });
      }
    });
  }
}

export async function fullCardNavInterface(evt) {
  evt.preventDefault();
  const link = evt?.target?.closest("a");

  if (link) {
    const { pathName } = getUrlInfo();
    const linkUrl = new URL(link.href);
    if (pathObject[linkUrl.pathname.slice(1) || "home"].name === pathName) {
      setFilmCardUrlInfo("");

      closeModal();
      return;
    }
    setFilmCardUrlInfo("");
    await loaderInterface(() => handleLocation(link.href));
  }

  const linkIsClicked = !!link;

  let backBtn = null;
  if (evt.target.nodeName === "BUTTON") backBtn = evt.target;
  if (evt.target?.closest("button")) backBtn = evt.target.closest("button");

  if (backBtn?.classList?.contains("back-btn") || linkIsClicked) closeModal();
}
