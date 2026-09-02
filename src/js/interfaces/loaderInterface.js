import { loaderRef } from "../services/refs";

let loaderDepth = 0;
let isUIActionsLocked = false;

function initLoader() {
  document
    .getElementById("app")
    .insertAdjacentHTML("beforeend", '<div class="loader"></div>');
}

function showLoader() {
  const loaderRoot = loaderRef();
  if (!loaderRoot) {
    initLoader();
    return showLoader();
  }

  loaderDepth += 1;
  console.log("show loader", loaderDepth);

  loaderRoot.classList.remove("hidden");
}
function hideLoader() {
  const loaderRoot = loaderRef();
  if (!loaderRoot) {
    initLoader();
    return hideLoader();
  }

  loaderDepth = loaderDepth < 1 ? 0 : loaderDepth - 1;
  console.log("hide loader", loaderDepth === 0);
  if (loaderDepth > 0) return;

  loaderRoot.classList.add("hidden");
}

async function loaderInterface(action) {
  if (isUIActionsLocked) return;

  console.log("A: loader START");
  showLoader();
  isUIActionsLocked = true;
  try {
    const result = await action();
    console.log("B: action RESOLVED");
    return result;
  } finally {
    console.log("C: hideLoader");
    hideLoader();
    isUIActionsLocked = false;
  }
}

export { initLoader, showLoader, hideLoader, loaderInterface };
