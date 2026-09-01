import { loaderRef } from "../services/refs";

function initLoader() {
  document
    .getElementById("app")
    .insertAdjacentHTML("beforeend", '<div class="loader"></div>');
}

function showLoader() {
  console.log("show loader");

  const loaderRoot = loaderRef();
  if (!loaderRoot) {
    initLoader();
    showLoader();
    return;
  }
  loaderRoot.classList.remove("hidden");
}
function hideLoader() {
  console.log("hide loader");

  const loaderRoot = loaderRef();
  if (!loaderRoot) {
    initLoader();
    showLoader();
    return;
  }
  loaderRoot.classList.add("hidden");
}

async function loaderInterface(func) {
  await showLoader();
  func();
  await hideLoader();
}

export { initLoader, showLoader, hideLoader, loaderInterface };
