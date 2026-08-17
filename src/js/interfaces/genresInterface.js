import { handleLocation, openGalleryByGenres } from "../services/routing";
import { activeGenresArr } from "../services/routing";
import { setUrlInfo } from "../services/urlInfoService";
import { genresListData } from "../utils";
import { hideLoader, showLoader } from "../interfaces";
import { errorToaster, infoToaster } from "../interfaces";

export const genresSectionInterface = (evt) => {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) return;
  let targetItem = null;
  if (evt.target.nodeName === "LI") targetItem = evt.target;
  if (evt.target.closest("li")) targetItem = evt.target.closest("li");
  if (!targetItem) return;

  const chipGenreId = targetItem?.dataset?.genreid;

  if (!chipGenreId) return;

  if (!activeGenresArr.includes(chipGenreId)) activeGenresArr.push(chipGenreId);
  //
  if (
    genresListData.genres.filter((i) => i.id === Number(chipGenreId)).length > 0
  ) {
    showLoader();
    openGalleryByGenres(1, [chipGenreId]);
    hideLoader();
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
  if (genresLink && activeGenresArr.length > 0) {
    genresLink.classList.remove("hidden");
  } else {
    genresLink.classList.add("hidden");
  }
};

function clickOnMobGenresBtn(genreBtn) {
  const clickedGenreId = genreBtn.dataset.genreid;
  const activeGenreIdIndex = activeGenresArr.indexOf(clickedGenreId);
  if (activeGenreIdIndex !== -1) {
    activeGenresArr.splice(activeGenreIdIndex, 1);
  } else {
    activeGenresArr.push(clickedGenreId);
  }
  mobileGenresClasswork();
}
function clickOnMobGenresLink(link) {
  if (
    link?.classList?.contains("section-expand-link") &&
    activeGenresArr.length > 0
  ) {
    showLoader();
    openGalleryByGenres(1, activeGenresArr);
    hideLoader();
  }
}

function mobileGenresClasswork() {
  Array.from(document.querySelectorAll(".mobile-genres-btn")).forEach(
    (chip) => {
      if (activeGenresArr.includes(chip.dataset.genreid)) {
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

  const genreIndex = activeGenresArr.indexOf(genreId);

  const startPosition = genresList.getBoundingClientRect().left;
  if (genreIndex < 0) {
    activeGenresArr.push(genreId);
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

    activeGenresArr.splice(genreIndex, 1);
    clickedElement.classList.remove("active");
    const chipName = clickedElement.textContent.trim();
    errorToaster({ message: `${chipName} removed from genres search` });

    if (activeGenresArr.length < 1) {
      showLoader();
      setUrlInfo({ pathName: "genres" });
      handleLocation();
      hideLoader();
      return;
    }

    const prevPositionInRoot = currentPosition - startPosition;
    genresList.scroll({
      top: 0,
      left: prevPositionInRoot,
      behavior: "smooth",
    });
  }

  // fetch films from activeGenresArrData

  showLoader();
  openGalleryByGenres(1, activeGenresArr);
  hideLoader();
}
