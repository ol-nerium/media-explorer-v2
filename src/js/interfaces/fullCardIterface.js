import { changeQuequeBtnTextByFilmId } from "../utils";
import { toggleValueFromLSKey } from "../utils/localStorage";
import { handleLocation } from "../services/routing";
import { closeModal } from "./modalInterface";
import { getUrlInfo } from "../services/urlInfoService";

const CONTROLS = {
  SHOWTRAILER: "showTrailer",
  ADDTOWATCHLIST: "addToWatchlist",
};
export function fullCardInterface(evt) {
  if (evt.currentTarget.nodeName !== "BUTTON") return;

  const dataControl = evt.currentTarget.dataset.control;
  if (dataControl === CONTROLS.SHOWTRAILER) console.log("show trailed modal");
  if (dataControl === CONTROLS.ADDTOWATCHLIST) {
    const section = evt.currentTarget.closest("section");
    const filmid = Number(section?.children[0]?.dataset?.filmid);

    toggleValueFromLSKey(filmid, "quequeFilmsList");
    changeQuequeBtnTextByFilmId(filmid);
  }
}

export function fullCardNavInterface(evt) {
  evt.preventDefault();
  const link = evt?.target?.closest("a");

  if (link) {
    const { pathName } = getUrlInfo();
    const linkUrl = new URL(link.href);
    if (linkUrl.pathname.slice(1) === pathName) {
      closeModal();
      return;
    }

    handleLocation(link.href);
    // return link;
  }

  const linkIsClicked = !!link;

  let backBtn = null;
  if (evt.target.nodeName === "BUTTON") backBtn = evt.target;
  if (evt.target?.closest("button")) backBtn = evt.target.closest("button");

  if (backBtn?.classList?.contains("back-btn") || linkIsClicked) closeModal();
}
