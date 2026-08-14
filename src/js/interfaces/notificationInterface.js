export function showLoader() {
  const loaderRoot = document.querySelector(".loader");
  loaderRoot.classList.remove("hidden");

  console.log("showLoader");
}
export function hideLoader() {
  const loaderRoot = document.querySelector(".loader");
  loaderRoot.classList.add("hidden");

  console.log("hideLoader");
}
