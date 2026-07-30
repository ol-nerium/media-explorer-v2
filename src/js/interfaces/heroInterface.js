import { heroSliderData, renderFilmCard } from "../../main";
import { heroSectionMarkup } from "../components/hero";
import { listenersReload, refs } from "../services/refs";

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
    alert("LS func should be here + maybe a toast");

    listenersReload();
  }
  if (btnData?.control === "showMore") {
    // alert("full card should open");

    const filmId = hero.dataset.filmid;

    renderFilmCard(filmId);

    // listenersReload();
  }
};
