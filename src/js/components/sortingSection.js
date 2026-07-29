import { genresListData } from "../utils";

const sortingSectiongenres = () => {
  return genresListData.genres
    .map(
      (genre) => `<li class="genres-chips-list_item">
                <button class="genres-chips-list_item-btn" data-genreId=${genre.id}>
                  <span>${genre.name}</span>
                </button>
                <div title="closeBtn" class="closeBtn">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#main-cross-2"></use>
                  </svg>
                </div>
              </li>`,
    )
    .join("");
};

export const createGenreChipsListMarkup = () => {
  return `<div class="genres-chips">
            <button class="genres-chips-btn-left" title="left-arrow" data-control="left">
              <svg class="icon left-arrow">
                <use xlink:href="./src/svgSprite.svg#main-left-arrow"></use>
              </svg>
            </button>

            <ul class="genres-chips-list snaps-inline">
              ${sortingSectiongenres()}             
            </ul>

            <button class="genres-chips-btn-right" title="right-arrow" data-control="right">
              <svg class="icon right-arrow">
                <use xlink:href="./src/svgSprite.svg#main-right-arrow"></use>
              </svg>
            </button>
          </div>`;
};
export const createDropdownMarkup = () => {
  return `<label for="sortingDropdown" class="dropdown"
            >Sort by:
            <select name="sortingDropdown" id="sortingDropdown">
              <button>
                <selectedcontent></selectedcontent>
                <span class="picker">👇</span>
              </button>

              <option value="">
                <span>Choose option!</span>
              </option>  

              <option value="nowPlaying">
                <span>Now Playing</span>
              </option>
              <option value="popular">
                <span>Popular</span>
              </option>
              <option value="topRated">
                <span>Top Rated</span>
              </option>
              <option value="upcoming">
                <span>Upcoming</span>
              </option>
            </select>
          </label>`;
};

//
export const sortingSectionMarkup = (
  genresMarkup = "",
  dropdownMarkup = "",
) => {
  if (!genresMarkup && !dropdownMarkup) return "";
  return `<section class="sorting">
        <h2 class="sr-only">Sorting section</h2>
        <div class="container sorting-layout">
          ${genresMarkup}
          ${dropdownMarkup}          
        </div>
      </section>`;
};
