import { openFilmCard } from "../interfaces";
import {
  activeGenresArr,
  handleLocation,
  openGalleryByGenres,
} from "../services/routing";
import { runExclusiveUiAction } from "../interfaces";

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
    await runExclusiveUiAction(() => openFilmCard(filmId));
  }
  if (genreId) {
    await runExclusiveUiAction(async () => {
      if (activeGenresArr.includes(genreId)) return;
      activeGenresArr.push(genreId);
      await openGalleryByGenres(1, activeGenresArr);
    });
  }
  if (navLink) {
    await runExclusiveUiAction(() => handleLocation(navLink.href));
  }
};
