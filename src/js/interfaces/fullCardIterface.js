import { changeQuequeBtnTextByFilmId } from "../utils";
import { toggleValueFromLSKey } from "../utils/localStorage";

export function fullCardInterface(evt) {
  //   const fullCardRoot = evt.currentTarget;
  const CONTROLS = {
    SHOWTRAILER: "showTrailer",
    ADDTOWATCHLIST: "addToWatchlist",
  };
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
