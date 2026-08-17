import { activeGenresArr } from "../services/routing";
import { createPoster } from "../utils";

import spriteUrl from "../../assets/svgSprite.svg";

// const savedGalleryItemGenres = (genreIds) => {
//   const genresList = [];
//   genresListData.genres.forEach((i) => {
//     if (genreIds.includes(i.id))
//       genresList.push(
//         `<li class="gallery-list_item-genres_item" data-genreid="${i.id}">${i.name}</li>`,
//       );
//   });
//   return genresList.join("");
// };
const savedGalleryItem = (data) => {
  const {
    adult,
    backdrop_path,
    // genre_ids,
    // genres,
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
  return `<li class="saved-gallery-list_item" data-filmid="${id}">
              <button class="closeBtn" type="button" title="removeElement">
                <svg class="icon cross-icon">
                  <use xlink:href="${spriteUrl}#main-cross-1"></use>
                </svg>
              </button>
              <div class="img-wrap">
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
              <div class="saved-gallery-list_item-desc">
                <h3 class="title">${title} <span class="year">(${release_date.slice(0, 4)})</span></h3>
                <ul class="gallery-list_item-genres">
                  ${data.genres
                    .map((genre) => {
                      return `<li class="gallery-list_item-genres_item ${activeGenresArr.includes(JSON.stringify(genre.id)) ? "active" : ""}" data-genreid="${genre.id}">${genre.name}</li>`;
                    })
                    .join("")}                  
                </ul>
              </div>
            </li>`;
};
export const savedGalleryMarkup = (data) => {
  if (data.length < 1 || !data)
    return `<section class="saved-gallery">
        <div class="container">
          <h2 class="saved-gallery_title">Nothing in the moment</h2>
        </div>
      </section>`;

  return `<section class="saved-gallery">
        <div class="container">
          <h2 class="saved-gallery_title sr-only">Watchlist</h2>
          <ul class="saved-gallery-list">
            ${data.map((film) => savedGalleryItem(film)).join("")}
          </ul>
        </div>
      </section>`;
};
