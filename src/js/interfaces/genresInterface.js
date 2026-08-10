import { openGalleryByGenres } from "../services/routing";
import { activeGenresArr } from "../services/routing";

export const genresSectionInterface = (evt) => {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) return;
  let targetItem = null;
  if (evt.target.nodeName === "LI") targetItem = evt.target;
  if (evt.target.closest("li")) targetItem = evt.target.closest("li");
  if (!targetItem) return;

  const chipGenreId = targetItem?.dataset?.genreid;
  if (chipGenreId) {
    if (!activeGenresArr.includes(chipGenreId))
      activeGenresArr.push(chipGenreId);
    openGalleryByGenres(1, [chipGenreId]);
  }
};

export const mobileGenresInterface = (evt) => {
  evt.preventDefault();
  const target = evt.target;
  console.log(target);
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
  )
    openGalleryByGenres(1, activeGenresArr);
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

    const prevPositionInRoot = currentPosition - startPosition;
    genresList.scroll({
      top: 0,
      left: prevPositionInRoot,
      behavior: "smooth",
    });
  }

  // fetch films from activeGenresArrData

  openGalleryByGenres(1, activeGenresArr);
}
