import { videosWindowMarkup } from "../components/fullCard";
import { getExternalFilmVideosById } from "../services/apiService";
import { backdropRef } from "../services/refs";
import { hideLoader, showLoader } from "../interfaces";

let videoContentElem = null;
let backdrop = null;

let videosData = [];
let index = 0;

export function videosWindowInterace(evt) {
  const target = evt.target;
  let btn = null;
  let control = null;

  if (target.nodeName === "BUTTON") btn = target;
  if (target.closest("BUTTON")?.nodeName) btn = target.closest("BUTTON");
  if (btn?.dataset?.control) control = btn.dataset.control;

  if (control === "left" || control === "right") {
    showLoader();
    changeFilmItem(control, index);
    hideLoader();
  }
  if (control === "close") closeVideosWindow();
}

export function openVideosWindow(filmid) {
  videosData = [];
  if (videoContentElem) return;
  videoContentElem = null;

  closeVideosWindow(); // clears potential opened videos window

  showLoader();
  getExternalFilmVideosById(filmid).then((res) => {
    videosData = res.results.filter(
      (i) => i.site === "YouTube" && i.name.toLowerCase().includes("trailer"),
    );

    backdrop = backdropRef();
    const needArrowBtn = videosData.length > 1;
    if (videosData.length > 0) {
      backdrop.insertAdjacentHTML(
        "beforeend",
        videosWindowMarkup(videosData[index], needArrowBtn),
      );
      videoContentElem = document.querySelector(".videos-content");
      videoContentElem.addEventListener("click", videosWindowInterace);
      hideLoader();
      return;
    }

    backdrop.insertAdjacentHTML(
      "beforeend",
      `<div class="videos-content">
      <div class="controls"><button data-control="close" class="closeBtn">
                   <svg class="icon close-icon">
                     <use xlink:href="./src/svgSprite.svg#main-cross-1"></use>
                   </svg>
                 </button></div>
        <h3>No available video links</h3>
       <div>`,
    );
    videoContentElem = document.querySelector(".videos-content");
    videoContentElem.addEventListener("click", videosWindowInterace);

    hideLoader();
  });
}

export function changeFilmItem(control) {
  const length = videosData.length;

  if (control === "left") {
    index -= 1;
    if (index < 0) index = length - 1;
  }
  if (control === "right") {
    index += 1;
    if (index > length - 1) index = 0;
  }

  const currentElement = document.querySelector(`.film-item`);
  currentElement.remove();

  videoContentElem.insertAdjacentHTML(
    "afterbegin",
    `<iframe
        src="https://www.youtube.com/embed/${videosData[index].key}"
        class="film-item"
      ></iframe>`,
  );
}

export function closeVideosWindow() {
  if (videoContentElem) {
    videoContentElem.removeEventListener("click", videosWindowInterace);
    videoContentElem.remove();
    videoContentElem = null;
    return;
  }
}
