import { lsKeys } from "../data";
import { handleLocation } from "../services/routing";
import { getUrlInfo } from "../services/urlInfoService";
import { removeFromLS } from "../utils/localStorage";
import { hideLoader, showLoader } from "./notificationInterface";
import { openFilmCard } from "./openFullFilmCard";

export const savedGalleryInterface = (evt) => {
  evt.preventDefault();
  showLoader();

  const galleryItem =
    evt.target.nodeName === "LI"
      ? evt.target
      : evt.target.closest("LI")
        ? evt.target.closest("LI")
        : null;

  let removeBtnClicked = false;
  const btn =
    evt.target.nodeName === "BUTTON"
      ? evt.target
      : evt.target.closest("BUTTON")
        ? evt.target.closest("BUTTON")
        : null;

  if (btn?.classList.contains("closeBtn")) removeBtnClicked = true;
  //
  const filmId = galleryItem?.dataset?.filmid;
  const { pathName } = getUrlInfo();

  if (filmId && removeBtnClicked) {
    removeFromLS(Number(filmId), lsKeys[pathName]);
  }

  if (filmId && !removeBtnClicked) openFilmCard(filmId);

  handleLocation();
  hideLoader();
};
