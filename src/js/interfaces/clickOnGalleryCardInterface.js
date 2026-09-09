import { openFilmCard } from "../interfaces";
import {
  appState,
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
    const sterializedGenreId = Number(genreId);
    if (appState.genres.includes(sterializedGenreId)) return;
    appState.genres.push(sterializedGenreId);

    await loaderInterface(() => openGalleryByGenres(1, appState.genres));
  }
  if (navLink) {
    await loaderInterface(() => handleLocation(navLink.href));
  }
};
