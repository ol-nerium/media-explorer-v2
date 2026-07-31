import { refs } from "../services/refs";
import { createPoster, genresListData } from "../utils";
import { getFromLS } from "../utils/localStorage";

const heroSectionGenres = (genre_ids) => {
  const genresList = [];
  genresListData.genres.forEach((i) => {
    if (genre_ids.includes(i.id))
      genresList.push(
        `<li class="hero-genreList_item" data-genreid="${i.id}">${i.name}</li>`,
      );
  });
  return genresList.join("");
};

const radioButtons = (index, title, checked) => {
  return `<label for="hero_option-${index}" class="hero-radiobuttons_item"
                ><input
                  type="radio"
                  id="hero_option-${index}"
                  name="hero-radiobutton"
                  title="${title}"
                  value="${index}" 
                  ${checked ? "checked" : ""}
                  /><span
                  class="checkmark"
                ></span
              ></label>`;

  // return `<label for="hero_option-${id}" class="hero-radiobuttons_item"
  //               ><input
  //                 type="radio"
  //                 id="hero_option-${id}"
  //                 name="hero-radiobutton"
  //                 title="${title}"
  //                 value="${id}"
  //                 ${checked ? "checked" : ""}
  //                 /><span
  //                 class="checkmark"
  //               ></span
  //             ></label>`;
};
export const heroSectionMarkup = (data, i = 0) => {
  let index = !isNaN(i) && i < data.length ? Number(i) : 0;
  index = index < 0 ? data.length - 1 : index;
  const {
    backdrop_path,
    genre_ids,
    id,
    original_title,
    title,
    overview,
    poster_path,
    release_date,
  } = data[index];
  const maxLengthArr = data.length;

  const heroRoot = refs.hero.elem();

  const heroWrapper = (markup) => {
    if (!heroRoot)
      return `<section class="hero" data-filmid="${id}">${markup}</section>`;
    heroRoot.dataset.filmid = id;
    return markup;
  };
  const isFilmInQueque = getFromLS("quequeFilmsList").includes(id);

  return heroWrapper(`<div class="hero-img-wrap" style="background-image:url('${createPoster(poster_path)}')"></div>
        <div class="container hero-layout">
          <h2 class="hero-title poppins-medium">${title}</h2>
          <div class="hero-short-desc">
            <p class="hero-short-desc-year">${release_date.split("-")[0]}</p>
            <ul class="hero-genreList">${heroSectionGenres(genre_ids)}</ul>
          </div>
          <p class="hero-description poppins-regular">
            ${overview}
          </p>

          <div class="hero-controls">
            <button class="hero-controls-arrows_left" title="left-arrow" data-control="arrow-left">
              <svg class="icon left-arrow">
                <use xlink:href="./src/svgSprite.svg#main-left-arrow"></use>
              </svg>
            </button>
            <button class="hero-controls-arrows_right" title="right-arrow" data-control="arrow-right">
              <svg class="icon right-arrow">
                <use xlink:href="./src/svgSprite.svg#main-right-arrow"></use>
              </svg>
            </button>

            <div class="hero-controls-btns" data-control="showMore">
              <button class="hero-controls-showMore poppins-medium" data-control="showMore">
                Show more
              </button>
              <button class="hero-controls-addToQueque poppins-medium" data-control="addToQueque">
                ${isFilmInQueque ? "Remove from queque" : "Add to queque"}
              </button>
            </div>

            <div class="hero-radiobuttons">
              ${data
                .slice(0, maxLengthArr)
                .map(({ id, title }, i) => {
                  return radioButtons(i, title, id === data[index].id);
                })
                .join("")}
            </div>

            <div class="hero-desktop-controls">
              <span class="hero-desktop-controls-value" >${"0" + (Number(index) + 1).toString()}</span>

              <span class="hero-desktop-controls-value" >${"0" + Number(maxLengthArr).toString()}</span>
            </div>
          </div>
        </div>
      `);
};
