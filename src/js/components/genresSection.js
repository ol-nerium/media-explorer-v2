import { activeGenresArr } from "../services/routing";
import { genresArr } from "../utils";

export const genresSectionMarkup = () => {
  return `<section class="genresSection">
        <div class="container">
          <ul class="genresSection-list">
            ${genresArr
              .map(
                (
                  genre,
                ) => `<li class="genresSection-list_item ${activeGenresArr.includes(JSON.stringify(genre.id)) ? "active" : ""}" data-genreid="${genre.id}">
              <a href="/">
                <div class="genresSection-icon-wrap">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#${genre.icon}"></use>
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
