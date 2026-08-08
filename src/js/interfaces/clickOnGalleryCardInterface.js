import { openFilmCard } from "../interfaces/openFullFilmCard";
import { drawMarkupFromPageURL, getUrlInfo } from "../services/routing";

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
  if (genreId) console.log("add genre and further");
  if (navLink) {
    drawMarkupFromPageURL(navLink.href);
  }
};
