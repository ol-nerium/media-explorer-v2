import YouTubePlayer from "youtube-player";

import { videosWindowMarkup } from "../components/fullCard";
import { getExternalFilmVideosById } from "../services/apiService";
import { backdropRef, videoContentRef } from "../services/refs";

import spriteUrl from "../../assets/svgSprite.svg";
import { hideLoader, loaderInterface, showLoader } from "./loaderInterface";

let videoContentElem = null;
let backdrop = null;

let videosData = [];
let index = 0;

export async function videosWindowInterace(evt) {
  const target = evt.target;
  let btn = null;
  let control = null;

  if (target.nodeName === "BUTTON") btn = target;
  if (target.closest("BUTTON")?.nodeName) btn = target.closest("BUTTON");
  if (btn?.dataset?.control) control = btn.dataset.control;

  if (control === "left" || control === "right") {
    await loaderInterface(() => changeFilmItem(control, index));
  }
  if (control === "close") closeVideosWindow();
}

export async function openVideosWindow(filmid) {
  videosData = [];
  if (videoContentElem) return;
  videoContentElem = null;

  closeVideosWindow(); // clears potential opened videos window

  try {
    const res = await getExternalFilmVideosById(filmid);
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
      player = YouTubePlayer("video-player");
      await new Promise((resolve) => {
        player.on("ready", resolve);
      });
    } else {
      backdrop.insertAdjacentHTML(
        "beforeend",
        `<div class="videos-content">
      <div class="controls"><button data-control="close" class="closeBtn">
                   <svg class="icon close-icon">
                     <use xlink:href="${spriteUrl}#main-cross-1"></use>
                   </svg>
                 </button></div>
        <h3>No available video links</h3>
       <div>`,
      );
    }

    videoContentElem = videoContentRef();
    videoContentElem.addEventListener("click", videosWindowInterace);
  } catch (error) {
    console.log(error);
    // do i need error handler here?
  }
}

let player = null;
export async function changeFilmItem(control) {
  if (player) {
    console.log("destroing player");
    player.destroy();
  }

  const length = videosData.length;

  if (control === "left") {
    index -= 1;
    if (index < 0) index = length - 1;
  }
  if (control === "right") {
    index += 1;
    if (index > length - 1) index = 0;
  }

  const currentElement = document.querySelector(".film-item");
  currentElement.remove();

  videoContentElem.insertAdjacentHTML(
    "afterbegin",
    `<iframe
        src="https://www.youtube.com/embed/${videosData[index].key}?enablejsapi=1"
        class="film-item"
        id="video-player"
      ></iframe>`,
  );

  player = YouTubePlayer("video-player");
  await new Promise((resolve) => {
    player.on("ready", resolve);
  });
}

export function closeVideosWindow() {
  if (videoContentElem) {
    videoContentElem.removeEventListener("click", videosWindowInterace);
    videoContentElem.remove();
    videoContentElem = null;

    if (player) {
      console.log("destroing player");
      player.destroy();
    }
    return;
  }
}
