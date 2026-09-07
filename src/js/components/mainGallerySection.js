import { appState } from "../services/routing";
import { genresListData } from "../utils";
import { createPoster } from "../utils";

import spriteUrl from "../../assets/svgSprite.svg";

const genresList = (genreIds) => {
  const genresList = [];
  genresListData.genres.forEach((i) => {
    if (genreIds.includes(i.id))
      genresList.push(
        `<li class="genres-list_item ${appState.genres.includes(JSON.stringify(i.id)) ? "active" : ""}" data-genreid="${i.id}"><a href="">${i.name}</a></li>`,
      );
  });
  return genresList.join("");
};

const mainGallerySectionItem = (data) => {
  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    title,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    softcore,
    video,
    vote_average,
    vote_count,
  } = data;

  return `<li class="gallery-list_item" data-filmid="${id}">
              <div class="gallery-list_item-img-wrap">
                <img src="${createPoster(poster_path)}" alt="${title}" />
                <a href="" title="item-link" class="item-link"></a>
              </div>

              <div class="raiting">
                <div class="raiting-value">
                  <svg class="icon star-icon">
                    <use xlink:href="${spriteUrl}#main-star"></use>
                  </svg>
                  <span>${vote_average.toFixed(2)}</span>
                </div>
                <div class="imdbIcon">
                  <svg class="icon">
                    <use xlink:href="${spriteUrl}#main-imdb"></use>
                  </svg>
                </div>
              </div>

              <div class="gallery-list_item-desc">
                <h3 class="gallery-list_item-title">${title} <span class="gallery-list_item-year">(${release_date.slice(0, 4)})</span></h3>
                <ul class="genres-list">
                  ${genresList(genre_ids)}
                </ul>
              </div>
            </li>`;
};

//  ${title ? `<h2 class="main-gallery-title ">${title}</h2>` : ""}
export const mainGallerySectionMarkup = (title, data) => {
  return `<section class="main-gallery">
        <div class="container">
        ${title ? `<h2 class="main-gallery-title ">${title}</h2>` : ""}
          <ul class="gallery-list">
            ${data.map((film) => mainGallerySectionItem(film)).join("")}
          </ul>
        </div>
      </section>`;
};
