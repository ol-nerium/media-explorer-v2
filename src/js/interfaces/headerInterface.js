import { openFetchedGalleryPage } from "../services/routing";
import {
  getFromLS,
  rewriteKeyCompletelyInLS,
} from "../services/localStorageService";
import { errorToaster, infoToaster } from "../interfaces";
import { loaderInterface } from "./loaderInterface";

export async function onSearchFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.currentTarget);
  const searchQuery = formData.get("search-field");

  if (searchQuery.trim() === "") {
    errorToaster({ message: "search field should not be empty" });
    // TODO
    return;
  }

  await loaderInterface(() => openFetchedGalleryPage(1, searchQuery));
  document.getElementById("search-field").value = "";
}

export function themeChangeInterface(evt) {
  let target = evt.target;
  let control = target?.dataset?.control;
  if (!control && target?.closest("button")?.nodeName === "BUTTON")
    control = target.closest("button")?.dataset?.control;

  if (control && control === "changeColorTheme") toggleTheme();
}

export function toggleTheme() {
  const body = document.body;

  if (body.classList.contains("darkmode")) {
    body.classList.remove("darkmode");
    body.classList.add("lightmode");
    rewriteKeyCompletelyInLS("theme", "lightmode");
    infoToaster({ message: "Light theme enabled" });
    return;
  }

  if (body.classList.contains("lightmode")) {
    body.classList.add("darkmode");
    body.classList.remove("lightmode");
    rewriteKeyCompletelyInLS("theme", "darkmode");
    infoToaster({ message: "Dark theme enabled" });

    return;
  }
}

export function setThemeFromLS() {
  const body = document.body;
  const currentTheme = getFromLS("theme") || "darkmode";

  if (body.classList.contains(currentTheme)) return;

  body.classList.remove("darkmode");
  body.classList.remove("lightmode");
  body.classList.add(currentTheme);

  rewriteKeyCompletelyInLS("theme", currentTheme);
}
