import { setUrlInfo } from "../services/routing";
import { searchedMoviesPage } from "../routes/movies";
import { getMoviesByGenre } from "../services/apiService";
import { listenersReload } from "../services/refs";

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

export const activeGenresArr = [];
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
  getMoviesByGenre(1, activeGenresArr).then((galleryData) => {
    setUrlInfo({
      pathName: "genres",
      searchQuery: "",
      page: 1,
      genres: activeGenresArr,
    });

    const galleryMarkup = searchedMoviesPage(
      `${activeGenresArr.join(",")}`,
      galleryData,
    );
    document.querySelector("main").innerHTML = galleryMarkup;
    listenersReload();
  });
  return activeGenresArr;
}

export function onSelectChange(evt) {
  console.log(evt.target.value);
  return evt.target.value;
}
