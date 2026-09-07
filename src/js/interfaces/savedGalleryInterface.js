import { lsKeys } from "../utils/data";
import { handleLocation } from "../services/routing";
import { getUrlInfo } from "../services/urlInfoService";
import { removeFromLS } from "../services/localStorageService";
import { errorToaster, hideLoader, showLoader } from "../interfaces";
import { openFilmCard } from "../interfaces";

export const savedGalleryInterface = (evt) => {
  evt.preventDefault();

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
    errorToaster({ message: "Film successfully removed from queue list" });
  }

  if (filmId && !removeBtnClicked) openFilmCard(filmId);
};
