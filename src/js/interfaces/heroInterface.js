import { heroSliderData } from "../utils/data";
import { heroSectionMarkup } from "../components/hero";
import { listenersReload, mainRef, refs } from "../services/refs";
import { openFilmCard } from "../interfaces";
import { toggleValueFromLSKey } from "../services/localStorageService";
import { changeQuequeBtnTextByFilmId } from "../utils";
import { hideLoader, showLoader } from "../interfaces";
import { errorToaster, successToaster } from "./toaster";

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

  const heroInputs = Array.from(document.querySelectorAll("input"));
  let currentIndex = 0;

  if (btnData?.control === "arrow-left") {
    currentIndex = Number(heroInputs.find((i) => i.checked).value);
    hero.remove();
    mainRef().insertAdjacentHTML(
      "afterbegin",
      heroSectionMarkup(heroSliderData, currentIndex - 1),
    );
    // hero.innerHTML = heroSectionMarkup(heroSliderData, currentIndex - 1);
    listenersReload();
  }
  if (btnData?.control === "arrow-right") {
    currentIndex = Number(heroInputs.find((i) => i.checked).value);
    hero.remove();
    mainRef().insertAdjacentHTML(
      "afterbegin",
      heroSectionMarkup(heroSliderData, currentIndex - 1),
    );
    listenersReload();
  }
  if (btnData?.control === "addToQueque") {
    const value = btn.closest("section").dataset.filmid;
    const filmId = Number(hero.dataset.filmid);
    const { saved, removed } = toggleValueFromLSKey(value, "quequeFilmsList");
    if (saved) successToaster({ message: "Film added to queque" });
    if (removed) {
      errorToaster({ message: "Film removed from queque" });
    }

    changeQuequeBtnTextByFilmId(filmId);
  }
  if (btnData?.control === "showMore") {
    const filmId = hero.dataset.filmid;
    showLoader();
    openFilmCard(filmId);
    hideLoader();
  }
};
