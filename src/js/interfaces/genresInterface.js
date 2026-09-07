import { handleLocation, openGalleryByGenres } from "../services/routing";
import { appState } from "../services/routing";
import { setUrlInfo } from "../services/urlInfoService";
import { genresListData } from "../utils";
import { errorToaster, infoToaster } from "../interfaces";
import { loaderInterface } from "./loaderInterface";

export const genresSectionInterface = (evt) => {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) return;
  let targetItem = null;
  if (evt.target.nodeName === "LI") targetItem = evt.target;
  if (evt.target.closest("li")) targetItem = evt.target.closest("li");
  if (!targetItem) return;

  const chipGenreId = targetItem?.dataset?.genreid;

  if (!chipGenreId) return;

  if (!appState.genres.includes(chipGenreId)) appState.genres.push(chipGenreId);
  //
  if (
    genresListData.genres.filter((i) => i.id === Number(chipGenreId)).length > 0
  ) {
    loaderInterface(() => openGalleryByGenres(1, [chipGenreId]));
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
  const activeGenreIdIndex = appState.genres.indexOf(clickedGenreId);
  if (activeGenreIdIndex !== -1) {
    appState.genres.splice(activeGenreIdIndex, 1);
  } else {
    appState.genres.push(clickedGenreId);
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
      if (appState.genres.includes(chip.dataset.genreid)) {
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
  const genresChipsRoot = document.querySelector(".genres-chips");
  const genresList = genresChipsRoot.querySelector(".genres-chips-list");
  const clickedElement = genresChipsRoot.querySelector(
    `[data-genreid="${genreId}"]`,
  );

  const genreIndex = appState.genres.indexOf(genreId);

  const startPosition = genresList.getBoundingClientRect().left;
  if (genreIndex < 0) {
    appState.genres.push(genreId);
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
      setUrlInfo({ pathName: "genres" });
      return loaderInterface(() => handleLocation());
    }

    const prevPositionInRoot = currentPosition - startPosition;
    genresList.scroll({
      top: 0,
      left: prevPositionInRoot,
      behavior: "smooth",
    });
  }

  // fetch films from activeGenresArrData

  loaderInterface(() => openGalleryByGenres(1, appState.genres));
}
