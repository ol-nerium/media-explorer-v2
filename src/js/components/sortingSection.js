import { SORTBY } from "../../main";
import { appState } from "../services/routing";
import { getUrlInfo } from "../services/urlInfoService";
import { genresListData } from "../utils";

import spriteUrl from "../../assets/svgSprite.svg";

const sortingSectionGenresList = (activeGenresIdsArr) => {
  return genresListData.genres
    .map((genre) => {
      const isGenreActive = activeGenresIdsArr.includes(
        JSON.stringify(genre.id),
      );

      return `<li class="genres-chips-list_item">
                <button class="genres-chips-list_item-btn ${isGenreActive ? "active" : ""}" data-genreId=${genre.id}>
                  <span>${genre.name}</span>
                  <svg class="close-icon icon">
                    <use xlink:href="${spriteUrl}#main-cross-2"></use>
                  </svg>
                </button>
                 
              </li>`;
    })
    .join("");
};

export const createGenreChipsListMarkup = (activeGenresIdsArr) => {
  return `<div class="genres-chips">
            <button class="genres-chips-btn-left" title="left-arrow" data-control="left">
              <svg class="icon left-arrow">
                <use xlink:href="${spriteUrl}#main-left-arrow"></use>
              </svg>
            </button>

            <ul class="genres-chips-list snaps-inline">
              ${sortingSectionGenresList(activeGenresIdsArr)}             
            </ul>

            <button class="genres-chips-btn-right" title="right-arrow" data-control="right">
              <svg class="icon right-arrow">
                <use xlink:href="${spriteUrl}#main-right-arrow"></use>
              </svg>
            </button>
          </div>`;
};

export const createDropdownMarkup = () => {
  const { genres } = appState;
  if (genres?.length < 1 || !genres) return "";

  const sortByKeys = Object.keys(SORTBY);
  let optionsMarkup = "";
  const { sortBy } = getUrlInfo();

  sortByKeys.forEach((sortOption) => {
    let selected =
      SORTBY[sortOption] === sortBy ||
      (sortBy === "" && SORTBY[sortOption] === SORTBY.POPULARITY)
        ? "selected"
        : "";
    // selected =
    //   sortBy === "" && SORTBY[sortOption] === SORTBY.POPULARITY
    //     ? "selected"
    //     : "";

    optionsMarkup += `<option value="${SORTBY[sortOption]}" ${selected}>
                <span>${sortOption.split("_").join(" ").toLowerCase()}</span>
              </option>`;
  });

  return `<label for="sortingDropdown" class="dropdown"
            >Sort by:
            <select name="sortingDropdown" id="sortingDropdown">
              <button>
                <selectedcontent></selectedcontent>
                <span class="picker">👇</span>
              </button>

              <option value="choose_option" disabled>
                <span>Choose option!</span>
              </option>
              <option value="" disabled class="empty_option">
                <span> </span>
              </option>
              ${optionsMarkup}
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
