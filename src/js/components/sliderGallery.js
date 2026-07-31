import { genresListData } from "../utils";
import { createPoster } from "../utils";

const sliderGalleryItemGenres = (genreIds) => {
  let genresMarkup = "";
  genresListData.genres.forEach((genre) => {
    if (genreIds.includes(genre.id))
      genresMarkup += `<li class="gallery-list_item-genres_item" data-genreid="${genre.id}">
        <a href="#">${genre.name}</a>
      </li>`;
  });
  return genresMarkup;
};
export const sliderGalleryItem = (data) => {
  return `<li class="gallery-list_item" data-filmId=${data.id}>
              <div class="gallery-list_item-img-wrap">
                <img src="${createPoster(data.poster_path)}" alt="${data.title}" />
                <a href="#correctThis" title="item-link" class="item-link"></a>
              </div>

              <div class="raiting">
                <div class="raiting-value">
                  <svg class="icon star-icon">
                    <use xlink:href="./src/svgSprite.svg#main-star"></use>
                  </svg>
                  <span>${data.vote_average.toFixed(1)}</span>
                </div>
                <div class="imdbIcon">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#main-imdb"></use>
                  </svg>
                </div>
              </div>

              <div class="gallery-list_item-desc">
                <h3 class="gallery-list_item-title">${data.original_title} <span class="gallery-list_item-year">(${data.release_date.slice(0, 4)})</span></h3>
                
                <ul class="gallery-list_item-genres">
                  ${sliderGalleryItemGenres(data.genre_ids)}
                </ul>
              </div>
            </li>`;
};
export const sliderGallerySectionMarkup = (title, data) => {
  return `<section class="slider-gallery ${title.split(" ").join("-")}" >
        <div class="container">
          <div class="section-heading">
            <h2 class="section-title">${title}</h2>
            <a href="/${title}" class="section-expand-link">View all... (fix links here pls)</a>
          </div>

          <ul class="gallery-list-slider snaps-inline">
            ${data.map((film) => sliderGalleryItem(film)).join("")}
          </ul>
        </div>
      </section>`;
};
