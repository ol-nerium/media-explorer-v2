import { loaderRef } from "../services/refs";

let loaderDepth = 0;
let isUiActionLocked = false;

export function initLoader() {
  document
    .getElementById("app")
    .insertAdjacentHTML("beforeend", '<div class="loader"></div>');
}

export function showLoader() {
  const loaderRoot = loaderRef();
  if (!loaderRoot) {
    initLoader();
    return showLoader();
  }

  loaderDepth += 1;
  document.body.classList.add("ui-busy");
  loaderRoot.classList.remove("hidden");
}

export function hideLoader() {
  const loaderRoot = loaderRef();
  if (!loaderRoot) {
    initLoader();
    return hideLoader();
  }

  loaderDepth = Math.max(0, loaderDepth - 1);
  if (loaderDepth > 0) return;

  document.body.classList.remove("ui-busy");
  loaderRoot.classList.add("hidden");
}

export function uiActionLocked() {
  return isUiActionLocked;
}

export async function runExclusiveUiAction(action) {
  if (isUiActionLocked) return null;

  isUiActionLocked = true;
  showLoader();

  try {
    return await action();
  } finally {
    isUiActionLocked = false;
    hideLoader();
  }
}
