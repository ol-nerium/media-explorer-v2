import { heroSliderData } from "../data";
import { heroSectionMarkup } from "../components/hero";
import { listenersReload, refs } from "../services/refs";
import { openFilmCard } from "../../main";
import { toggleValueFromLSKey } from "../utils/localStorage";
import { changeQuequeBtnTextByFilmId } from "../utils";

export const heroInterface = (evt) => {
  const hero = refs.hero.elem();

  const target = evt.target;
  const elemTagName = evt.target.nodeName;

  const btn = elemTagName === "BUTTON" ? target : null;
  const btnChild = evt.target.closest("button") ? evt.target : null;
  const btnData = btn?.dataset ?? btnChild?.closest("button")?.dataset;

  let radioBtnValue = null;
  if (elemTagName === "INPUT") {
    radioBtnValue = target.value;

    hero.innerHTML = heroSectionMarkup(heroSliderData, radioBtnValue);
    listenersReload();
  }

  const heroInputs = document.querySelectorAll("input");
  let currentIndex = 0;

  if (btnData?.control === "arrow-left") {
    currentIndex = Number(Array.from(heroInputs).find((i) => i.checked).value);

    hero.innerHTML = heroSectionMarkup(heroSliderData, currentIndex - 1);
    listenersReload();
  }
  if (btnData?.control === "arrow-right") {
    currentIndex = Number(Array.from(heroInputs).find((i) => i.checked).value);

    hero.innerHTML = heroSectionMarkup(heroSliderData, currentIndex + 1);
    listenersReload();
  }
  if (btnData?.control === "addToQueque") {
    // alert("LS func should be here + maybe a toast");
    const value = btn.closest("section").dataset.filmid;
    const filmId = Number(hero.dataset.filmid);

    toggleValueFromLSKey(value, "quequeFilmsList");
    changeQuequeBtnTextByFilmId(filmId);

    // listenersReload();
  }
  if (btnData?.control === "showMore") {
    const filmId = hero.dataset.filmid;

    openFilmCard(filmId);
  }
};
