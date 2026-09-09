import {
  handleLocation,
  navigate,
  openGalleryByGenres,
  setState,
} from "../services/routing";
import { appState } from "../services/routing";
import { genresListData } from "../utils";
import { errorToaster, infoToaster } from "../interfaces";
import { loaderInterface } from "./loaderInterface";
import { ORDER, SORTBY } from "../../main";

export const genresSectionInterface = (evt) => {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) return;
  let targetItem = null;
  if (evt.target.nodeName === "LI") targetItem = evt.target;
  if (evt.target.closest("li")) targetItem = evt.target.closest("li");
  if (!targetItem) return;

  const chipGenreId = targetItem?.dataset?.genreid;

  if (!chipGenreId) return;

  const sterializedGenreId = Number(chipGenreId);
  if (!appState.genres.includes(sterializedGenreId)) {
    navigate({
      pathName: "genres",
      genres: [...appState.genres, sterializedGenreId],
      // sortBy: appState.sortBy || SORTBY.POPULARITY,
      // order: appState.order || ORDER.DESC,
    });
  }

  if (
    genresListData.genres.filter((i) => i.id === sterializedGenreId).length > 0
  ) {
    const sortBy = appState.sortBy || null;
    const order = appState.order || null;
    loaderInterface(() =>
      openGalleryByGenres(1, [sterializedGenreId], sortBy, order),
    );
  }
};

export const mobileGenresInterface = (evt) => {
  evt.preventDefault();
  const target = evt.target;
  let genreBtn;
  let link;
  if (target.nodeName === "A") link = target;
  if (target.closest("a")) link = target.closest("a");

  if (target.nodeName === "button") genreBtn = target;
  if (
    target.nodeName !== "button" &&
    target.closest("button")?.dataset?.genreid
  ) {
    genreBtn = target.closest("button");
  }

  if (genreBtn) clickOnMobGenresBtn(genreBtn);
  if (link) clickOnMobGenresLink(link);

  const genresLink = evt.currentTarget.querySelector(".section-expand-link");
  if (genresLink && appState.genres.length > 0) {
    genresLink.classList.remove("hidden");
  } else {
    genresLink.classList.add("hidden");
  }
};

function clickOnMobGenresBtn(genreBtn) {
  const clickedGenreId = genreBtn.dataset.genreid;
  const sterializedGendeId = Number(clickedGenreId);
  const activeGenreIdIndex = appState.genres.indexOf(sterializedGendeId);
  if (activeGenreIdIndex !== -1) {
    setState({
      genres: [
        ...appState.genres.slice(0, activeGenreIdIndex),
        ...appState.genres.slice(activeGenreIdIndex + 1),
      ],
    });

    // navigate() ??
    // appState.genres.splice(activeGenreIdIndex, 1);
  } else {
    setState({
      genres: [...appState.genres, sterializedGendeId],
    });
  }
  mobileGenresClasswork();
}
function clickOnMobGenresLink(link) {
  if (
    link?.classList?.contains("section-expand-link") &&
    appState.genres.length > 0
  ) {
    loaderInterface(() => openGalleryByGenres(1, appState.genres));
  }
}

function mobileGenresClasswork() {
  Array.from(document.querySelectorAll(".mobile-genres-btn")).forEach(
    (chip) => {
      const sterializedGenreId = Number(chip.dataset.genreid);
      if (appState.genres.includes(sterializedGenreId)) {
        chip.classList.add("active");
      } else chip.classList.remove("active");
    },
  );
}

export function genreChipsInterface(evt) {
  // can be bugged here
  let targetedBtn = evt.target.closest("button");
  if (evt.target.nodeName === "button") targetedBtn = evt.target;
  if (evt.target.nodeName === "span")
    targetedBtn = evt.target.closest("button");

  if (!targetedBtn) return;

  if (targetedBtn.dataset.control)
    onControlArrowClick(targetedBtn.dataset.control);
  if (targetedBtn.dataset.genreid)
    onGenreChipClick(targetedBtn.dataset.genreid);
}

function onControlArrowClick(controlDir) {
  const genresList = document.querySelector(".genres-chips-list");
  const avgElementWidth = Math.ceil(
    genresList.scrollWidth / (genresList.childNodes.length - 2),
  );

  let direction = null;
  if (controlDir === "left") direction = -1;
  if (controlDir === "right") direction = +1;
  if (!direction) return;

  genresList.scrollBy({
    top: 0,
    left: avgElementWidth * direction,
    behavior: "smooth",
  });
}

function onGenreChipClick(genreId) {
  const sterializedGenreId = Number(genreId);
  const genresChipsRoot = document.querySelector(".genres-chips");
  const genresList = genresChipsRoot.querySelector(".genres-chips-list");
  const clickedElement = genresChipsRoot.querySelector(
    `[data-genreid="${sterializedGenreId}"]`,
  );

  const genreIndex = appState.genres.indexOf(sterializedGenreId);

  const startPosition = genresList.getBoundingClientRect().left;
  if (genreIndex < 0) {
    appState.genres.push(sterializedGenreId);
    clickedElement.classList.add("active");
    const chipName = clickedElement.textContent.trim();
    infoToaster({ message: `${chipName} added to search for genres` });
    const nextPosition = clickedElement.getBoundingClientRect().left;

    const positionInRoot = nextPosition - startPosition;
    genresList.scrollBy({
      top: 0,
      left: positionInRoot,
      behavior: "smooth",
    });
  } else {
    const currentPosition = clickedElement.getBoundingClientRect().left;

    appState.genres.splice(genreIndex, 1);
    clickedElement.classList.remove("active");
    const chipName = clickedElement.textContent.trim();
    errorToaster({ message: `${chipName} removed from genres search` });

    if (appState.genres.length < 1) {
      navigate({ pathName: "genres" });
      return loaderInterface(() => handleLocation());
    }

    const prevPositionInRoot = currentPosition - startPosition;
    genresList.scroll({
      top: 0,
      left: prevPositionInRoot,
      behavior: "smooth",
    });
  }

  navigate({
    pathName: "genres",
    genres: appState.genres,
    page: appState.page || 1,
    sortBy: appState.sortBy || SORTBY.POPULARITY,
    order: appState.order || ORDER.DESC,
  });
  loaderInterface(() => handleLocation());
  // loaderInterface(() => openGalleryByGenres(1, appState.genres));
}
