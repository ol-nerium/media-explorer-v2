export function toTop() {
  document.body.scrollTo({ x: 0, y: 0, behavior: "smooth" });
}

export function createToTopBtn() {
  document.getElementById("app").insertAdjacentHTML(
    "beforeend",
    `<button class="toTopBtn hidden" title="toTop button">
          <svg class="icon">
            <use xlink:href="./src/svgSprite.svg#main-top-arrow"></use>
          </svg>
        </button>`,
  );
}
