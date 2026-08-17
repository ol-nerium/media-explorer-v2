import { loaderRef } from "../services/refs";

export function initLoader() {
  document
    .getElementById("app")
    .insertAdjacentHTML("beforeend", '<div class="loader"></div>');
}

export function showLoader() {
  console.log("show loader");

  const loaderRoot = loaderRef();
  if (!loaderRoot) {
    initLoader();
    showLoader();
    return;
  }
  loaderRoot.classList.remove("hidden");
}
export function hideLoader() {
  console.log("hide loader");

  const loaderRoot = loaderRef();
  if (!loaderRoot) {
    initLoader();
    showLoader();
    return;
  }
  loaderRoot.classList.add("hidden");
}
