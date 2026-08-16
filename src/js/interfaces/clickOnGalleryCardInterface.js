import { openFilmCard } from "../interfaces/openFullFilmCard";
import { getSimilarMoviesById } from "../services/apiService";
import {
  activeGenresArr,
  handleLocation,
  openGalleryByGenres,
} from "../services/routing";
import { hideLoader, showLoader } from "./notificationInterface";
import { successToaster } from "./toaster";

export const clickOnGalleryCardInterface = (evt) => {
  evt.preventDefault();

  const target = evt.target;
  let listItem;
  let navLink;

  if (target.nodeName !== "li") {
    listItem = target.closest("li");
  } else listItem = target;

  if (target.classList.contains("section-expand-link")) {
    navLink = target;
  }

  const filmId = listItem?.dataset?.filmid;
  const genreId = listItem?.dataset?.genreid;

  if (filmId) {
    showLoader();
    openFilmCard(filmId);
    hideLoader();
  }
  if (genreId) {
    if (activeGenresArr.includes(genreId)) return;
    activeGenresArr.push(genreId);
    showLoader();
    openGalleryByGenres(1, activeGenresArr);

    hideLoader();
  }
  if (navLink) {
    showLoader();
    handleLocation(navLink.href);
    hideLoader();
  }
};
