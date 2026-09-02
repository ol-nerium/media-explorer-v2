import { openFilmCard } from "../interfaces";
import {
  activeGenresArr,
  handleLocation,
  openGalleryByGenres,
} from "../services/routing";
import { loaderInterface } from "./loaderInterface";

export const clickOnGalleryCardInterface = async (evt) => {
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
    await loaderInterface(() => openFilmCard(filmId));
  }
  if (genreId) {
    if (activeGenresArr.includes(genreId)) return;
    activeGenresArr.push(genreId);

    await loaderInterface(() => openGalleryByGenres(1, activeGenresArr));
  }
  if (navLink) {
    await loaderInterface(() => handleLocation(navLink.href));
  }
};
