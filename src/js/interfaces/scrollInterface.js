import spriteUrl from "../../assets/svgSprite.svg";
import { appRootRef } from "../services/refs";

export function toTop() {
  document.body.scrollTo({ x: 0, y: 0, behavior: "smooth" });
}

export function createToTopBtn() {
  appRootRef().insertAdjacentHTML(
    "beforeend",
    `<button class="toTopBtn hidden" title="toTop button">
          <svg class="icon">
            <use xlink:href="${spriteUrl}#main-top-arrow"></use>
          </svg>
        </button>`,
  );
}
