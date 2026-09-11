import { appState } from "../services/routing";
import { genresArr } from "../utils";

import spriteUrl from "../../assets/svgSprite.svg";

export const mobileGenresSectionMarkup = () => {
  return `<section class="mobile-genres">
        <div class="container">
          <div class="section-heading">
            <h2 class="section-title">Genres</h2>
            <a href="#" class="section-expand-link ${appState.genres.length < 1 ? "hidden" : ""}">Show movies list</a>
          </div>
          <ul class="mobile-genres-list snaps-inline">
            ${genresArr
              .map((genre, index) => {
                const normalizedGenreId = Number(genre.id);
                return `<li class="mobile-genres-list_item">
              <button href="#" class="mobile-genres-btn ${appState.genres.includes(normalizedGenreId) ? "active" : ""}" data-genreid="${genre.id}">
                <div class="mobile-genres-icon-wrap">
                  <svg class="icon">
                    <use xlink:href="${spriteUrl}#${genre.icon}"></use>
                  </svg>
                </div>
                <p>${genre.name}</p>
              </button>
            </li>`;
              })
              .join("")}
            
          </ul>
        </div>
      </section>`;
};
