import { appState } from "../services/routing";
import { genresArr } from "../utils";

import spriteUrl from "../../assets/svgSprite.svg";

export const genresSectionMarkup = () => {
  const { genres } = appState;
  return `<section class="genresSection">
        <div class="container">
          <ul class="genresSection-list">
            ${genresArr
              .map(
                (
                  genre,
                ) => `<li class="genresSection-list_item ${genres.includes(Number(genre.id)) ? "active" : ""}" data-genreid="${genre.id}">
              <a href="/">
                <div class="genresSection-icon-wrap">
                  <svg class="icon">
                    <use xlink:href="${spriteUrl}#${genre.icon}"></use>
                  </svg>
                </div>
                <h3 class="genresSection-list_item-title">${genre.name}</h3>
              </a>
            </li>`,
              )
              .join("")}
          </ul>
        </div>
      </section>`;
};
