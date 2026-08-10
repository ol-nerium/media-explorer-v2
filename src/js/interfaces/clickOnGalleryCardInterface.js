import { openFilmCard } from "../interfaces/openFullFilmCard";
import {
  activeGenresArr,
  handleLocation,
  openGalleryByGenres,
} from "../services/routing";

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
    openFilmCard(filmId);
  }
  if (genreId) {
    if (activeGenresArr.includes(genreId)) return;
    activeGenresArr.push(genreId);
    openGalleryByGenres(1, activeGenresArr);
  }
  if (navLink) {
    handleLocation(navLink.href);
  }
};
