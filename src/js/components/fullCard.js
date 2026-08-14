import { format } from "date-fns";

import { createAvatar, createBackdropBackgound, createPoster } from "../utils";
import { sliderGalleryItem } from "./sliderGallery";
import {
  activeGenresArr,
  pathObject,
  setFilmCardUrlInfo,
} from "../services/routing";
import { getUrlInfo } from "../services/urlInfoService";
import { getFromLS } from "../utils/localStorage";

let adult,
  backdrop_path,
  belongs_to_collection,
  budget,
  genres,
  homepage,
  id,
  imdb_id,
  origin_country,
  original_language,
  original_title,
  overview,
  popularity,
  poster_path,
  production_companies,
  production_countries,
  release_date,
  revenue,
  runtime,
  softcore,
  spoken_languages,
  status,
  tagline,
  title,
  video,
  vote_average,
  vote_count;

let isFilmInQueque;

const fullCardNav = ({ title, id }) => {
  const { pathName, search, page, genres, filmId } = getUrlInfo();

  return `<div class="full-card-nav">
          <button href="#" title="back" class="back-btn">
            <svg class="icon">
              <use xlink:href="./src/svgSprite.svg#main-left-arrow"></use>
            </svg>
          </button>
          <ul class="full-card-nav-list">
            <li class="full-card-nav-list_item">
              <a href="/">Home</a>
            </li>
            ${
              !pathObject[pathName] || !pathName
                ? ""
                : `<li class="full-card-nav-list_item">
              <a href="${pathObject[pathName].path}">${pathName}</a>
            </li>`
            }
            <li class="full-card-nav-list_item">
              <span>${title}</span>
            </li>
          </ul>
        </div>`;
};
const baseFilmContent = () => {
  // <img src="${createPoster(poster_path)}" alt="${title}" />;

  return `<div class="base-film-content">
            <div class="full-card-img-wrap">
              ${backdrop_path ? `<img src="${createBackdropBackgound(backdrop_path)}" alt="${title}" />` : ""}
            </div>

            <div class="full-card-heading">
              <h1 class="title">${title}</h1>
              ${
                vote_count
                  ? `<div class="raiting">
                <div class="raiting-value">
                  <svg class="icon star-icon">
                    <use xlink:href="./src/svgSprite.svg#main-star"></use>
                  </svg>
                  <span>${vote_average}</span>
                </div>
                <div class="imdbIcon">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#main-imdb"></use>
                  </svg>
                </div>
              </div>`
                  : ""
              }

              <div class="short-desc">
                <ul class="short-desc-list">
                  <li class="short-desc-list_item">${release_date.slice(0, 4)}</li>
                  <li class="short-desc-list_item">${173}min</li>
                </ul>
                <ul class="genres-list">
                  ${genres
                    .map(
                      (genre) =>
                        `<li class="genres-list-item" data-genreid="${genre.id}">${genre.name}</li>`,
                    )
                    .join("")}
                </ul>
              </div>

              <p class="full-card-heading-text">
                ${overview}
              </p>

              <div class="full-card-controls">
                <button type="button" class="full-card-controls_trailerBtn" data-control="showTrailer">
                  Watch trailer
                </button>
                <button type="button" class="full-card-controls_AddToWatchlist" data-control="addToWatchlist">
                  
${isFilmInQueque ? "Remove from queque" : "Add to queque"}
                </button>
              </div>
            </div>
          </div>`;
};
const additionalFilmContent = (data) => {
  const { cast, crew } = data.credits;
  let directorArr = crew.filter((i) => i.job === "Director");

  let starringActors =
    cast.length > 0
      ? cast
      : [
          {
            adult: false,
            gender: 2,
            id: 0,
            known_for_department: null,
            name: "No information",
            original_name: "",
            popularity: 0,
            profile_path: "/",
            cast_id: 0,
            character: null,
            credit_id: null,
            order: 0,
          },
        ];

  return `<div class="additional-film-content">
            <h2 class="sr-only">Additional film content</h2>
            <ul class="additional-film-content-list">
              <li class="additional-film-content-list_item">
                <h3 class="additional-film-content-list_item-title">
                  Starring
                </h3>
                <ul class="additional-film-content-list_item-desc">
                  ${starringActors.map((i) => `<li data-character="${i.character}">${i.name}</li>`).join("")}
                </ul>
              </li>
              <li class="additional-film-content-list_item">
                <h3 class="additional-film-content-list_item-title">
                  Director
                </h3>
                <p class="additional-film-content-list_item-desc">
                  ${directorArr.length !== 0 ? directorArr.map((i) => i.name).join("") : "No information"}
                </p>
              </li>
              <li class="additional-film-content-list_item">
                <h3 class="additional-film-content-list_item-title">
                  Release date
                </h3>
                <p class="additional-film-content-list_item-desc">
                  ${release_date ? format(release_date, "LLLL 	dd, yyyy") : "No information"}
                </p>
              </li>
            </ul>
          </div>`;
};
const fullCardGallery = (data) => {
  const similar = data.similar.results;

  const similarFilmsList = similar.map((film) => sliderGalleryItem(film));
  // <a href="#" class="section-expand-link">
  //   View all...
  // </a>;

  if (similarFilmsList.length < 1) return "";

  return `<section class="full-card-gallery">
            <div class="section-heading">
              <h2 class="section-title">You May Also Like</h2>
            </div>
            <ul class="gallery-list-slider snaps-inline">
              ${similarFilmsList.join("")}
            </ul>
        </section>`;
};

const comments = (data) => {
  const reviews = data.reviews.results;

  if (reviews.length < 1) return "";

  const item = (comment) => {
    const { author, author_details, content, created_at, id, updated_at, url } =
      comment;
    const { name, username, avatar_path, rating } = author_details;
    const starsMarkup = (rating) => {
      if (!rating) return "";

      const count = Math.round(rating);
      const missingStars = 10 - count;
      let resArrStr = "";
      for (let i = 0; i < count; i += 1) {
        resArrStr += `<svg class="icon star-icon">
        <use xlink:href="./src/svgSprite.svg#main-star"></use>
      </svg>`;
      }

      for (let i = 0; i < missingStars; i += 1) {
        resArrStr += `<svg class="icon star-icon inactive-star">
        <use xlink:href="./src/svgSprite.svg#main-star"></use>
      </svg>`;
      }
      return `<div class="stars">${resArrStr} </div>`;
    };
    const commentDateStr = ({ created_at, updated_at }) => {
      if (!created_at) return "";
      const wasUpdated = created_at !== updated_at;

      const formatedCreatedDate = created_at
        ? format(created_at, "LLLL dd, yyyy kk:mm:ss")
        : "";
      const formatedUpdatedDate = updated_at
        ? format(updated_at, "LLLL dd, yyyy kk:mm:ss")
        : "";
      const resStr = wasUpdated
        ? `created: ${formatedCreatedDate} `
        : `created: ${formatedCreatedDate}. edited: ${formatedUpdatedDate}`;
      return resStr;
    };

    const raitingValue = rating
      ? `<span class="comment-raiting-value">(${rating})</span>`
      : "";
    // <button>
    //   <svg class="icon">
    //     <use xlink:href="./src/svgSprite.svg#main-thumbs-up"></use>
    //   </svg>
    //   Helpful <span>(128)</span>
    // </button>;

    return `<li class="comments-item">
              <div class="avatar-wrap">
                <div class="thumb">
                  <img src="${createAvatar(avatar_path)}" alt="${username}">
                </div>
              </div>
              <div class="comments-item_content">
                <div class="comments-item_heading">
                  <h3 class="comments-item_heading_title">${author} @${username}</h3>
                  <div class="star-division_item" data-starCount="5">
                      ${starsMarkup(rating)}
                      ${raitingValue}
                  </div>
                </div>

                <p class="comments-item_heading_date">${commentDateStr(comment)} </p>
                <p class="comments-item_heading_desc">
                  ${content}
                </p>
                
              </div>
            </li>`;
  };

  return `<ul class="comments">
            ${reviews.map((comment) => item(comment)).join("")}
          </ul>`;
};

/* <ul class="videos-content_list">
  ${videosData
    .map(
      (i) =>
        `<li class="videos-content_list-item"><a rel="noopener noreferrer" target="_blank" href='https://www.youtube.com/watch?v=${i.key}'>${i.name}</a></li>`,
    )
    .join("")}
</ul>; */

export function videosWindowMarkup(videosData, needsArrowButtons) {
  return `<div class="videos-content">
             <iframe src="https://www.youtube.com/embed/${videosData.key}" class="film-item"></iframe>

               <div class="controls">
                 <button data-control="close" class="closeBtn">
                   <svg class="icon close-icon">
                     <use xlink:href="./src/svgSprite.svg#main-cross-1"></use>
                   </svg>
                 </button>
  ${
    needsArrowButtons
      ? ` <button data-control="left" class="leftBtn">
                   <svg class="icon left-arrow">
                     <use xlink:href="./src/svgSprite.svg#main-left-arrow"></use>
                   </svg>
                 </button>

                 <button data-control="right" class="rightBtn">
                   <svg class="icon right-arrow">
                     <use xlink:href="./src/svgSprite.svg#main-right-arrow"></use>
                   </svg>
                 </button>`
      : ""
  }
               </div>`;
}

export const fullCardMarkup = (filmData) => {
  ({
    adult,
    backdrop_path,
    belongs_to_collection,
    budget,
    genres,
    homepage,
    id,
    imdb_id,
    origin_country,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    revenue,
    runtime,
    softcore,
    spoken_languages,
    status,
    tagline,
    title,
    video,
    vote_average,
    vote_count,
  } = filmData.mainData);

  console.log(filmData);

  isFilmInQueque = getFromLS("quequeFilmsList")?.includes(id);

  return `
      <div class="container full-card-layout" data-filmid="${id}" >
        ${fullCardNav({ title, id })}
        <div class="film-content">
          ${baseFilmContent()}
          ${additionalFilmContent(filmData)}
        </div>
        ${fullCardGallery(filmData)}
        <div class="reviews">
          <h2 class="reviews-title">Reviews</h2>
          ${comments(filmData)}          
        </div>
      </div>
    `;
};
