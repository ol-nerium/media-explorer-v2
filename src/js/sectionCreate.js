import { getGenresList, getImageConfiguration } from "./services/apiService";

const genresListData = await getGenresList();
// console.log(genresListData.genres);
const configuration = await getImageConfiguration();
const {
  base_url,
  secure_base_url,
  backdrop_sizes,
  logo_sizes,
  poster_sizes,
  profile_sizes,
  still_sizes,
} = configuration.images;

const originalImgExample =
  secure_base_url + poster_sizes[poster_sizes.length - 1] + "/image.img";

const fallbackImg = "../blank-picture.png";
const genreIcons = {
  Action: "genres-action",
  Adventure: "genres-adventure",
  Animation: "genres-animation",
  Comedy: "genres-comedy",
  Crime: "genres-crime",
  Documentary: "genres-documentary",
  Drama: "genres-drama",
  Family: "genres-family",
  Fantasy: "genres-fantazy",
  History: "genres-history",
  Horror: "genres-horror",
  Music: "genres-music",
  Mystery: "genres-mystery",
  Romance: "genres-romance",
  "Science Fiction": "genres-science",
  "TV Movie": "genres-tv",
  Thriller: "genres-thriller",
  War: "genres-war",
  Western: "genres-western",
};
const genresArr = genresListData.genres.map((item) => {
  return { ...item, icon: genreIcons[item.name] };
});

const createPoster = (poster_path) => {
  return poster_path
    ? secure_base_url + poster_sizes[poster_sizes.length - 1] + poster_path
    : fallbackImg;
};

const headerMarkup = () => {
  return `<header class="header">
      <div class="container mobile-header-layout">
        <button
          type="button"
          class="navBtn"
          title="open menu"
          data-control="openMobileMenu"
        >
          <svg class="icon">
            <use xlink:href="./src/svgSprite.svg#main-burger"></use>
          </svg>
        </button>
        <h1 class="poppins-semibold headerTitle">Home</h1>
        <button
          type="button"
          class="navBtn"
          title="toggle color theme"
          data-control="changeColorTheme"
        >
          <svg class="icon">
            <use xlink:href="./src/svgSprite.svg#main-moon"></use>
          </svg>
        </button>
      </div>

      <div class="header-menu-layout">
        <a href="/" title="logo" class="logo">
          <svg class="icon">
            <use xlink:href="./src/svgSprite.svg#Logo-icon"></use>
          </svg>
        </a>
        <ul class="main-links-list">
          <li class="main-links-list_item">
            <a href="/">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-home"></use>
              </svg>
              Home
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/movies">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>
              Movies
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/genres">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-saved"></use>
              </svg>
              Genres
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/watchlist">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>
              Watchlist
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/history">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-history"></use>
              </svg>
              History
            </a>
          </li>
        </ul>

        <h2 class="library-links_title">Your Library</h2>
        <ul class="library-links-list">
          <li class="library-links-list_item">
            <a href="/favorites">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>
              Favorites
            </a>
          </li>

          <li class="library-links-list_item">
            <a href="/queue">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-queue"></use>
              </svg>
              In Queque
            </a>
          </li>
        </ul>

        <ul class="settings-links-list">
          <li class="settings-links-list_item">
            <a href="/settings">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-settings"></use>
              </svg>
              Settings
            </a>
          </li>

          <li class="settings-links-list_item">
            <a href="/logout">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-logout"></use>
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </div>

      <section class="main-heading">
        <h2 class="sr-only">Main page heading</h2>
        <div class="main-heading-layout container">
          <div class="searchbar">
            <form class="searchbar-form">
              <label for="search-field" class="search-field">
                <svg class="icon">
                  <use
                    xlink:href="./src/svgSprite.svg#main-magnify-glass-1"
                  ></use>
                </svg>
                <input id="search-field" placeholder="Search for movies..." />
              </label>
              <button
                type="submit"
                class="searchbar-button"
                title="search by query"
              >
                <svg class="icon">
                  <use
                    xlink:href="./src/svgSprite.svg#main-magnify-glass-2"
                  ></use>
                </svg>
              </button>
            </form>
          </div>

          <div class="main-heading-buttons">
            <button
              type="button"
              title="themeBtn"
              data-control="changeColorTheme"
            >
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-moon"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </header>`;
};

const mainPageInfoSectionMarkup = () => {
  return `<section class="main-page-info">
        <div class="container main-page-info-layout">
          <ul class="nav-list">
            <li class="nav-list_item"><a href="#"> Home </a></li>
            <li class="nav-list_item"><a href="#"> Movies </a></li>
            <li class="nav-list_item"><a href="#"> Popular </a></li>
          </ul>
          <h2 class="main-page-info-title">Home</h2>
        </div>
      </section>`;
};

const createGenresListItems = () => {
  return genresListData.genres
    .map(
      (genre) => `<li class="genres-chips-list_item">
                <button class="genres-chips-list_item-btn" data-genreId=${genre.id}>
                  <span>${genre.name}</span>
                </button>
                <button title="closeBtn" class="closeBtn">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#main-cross-2"></use>
                  </svg>
                </button>
              </li>`,
    )
    .join("");
};
const sortingSectionMarkup = () => {
  const genresListItems = createGenresListItems();

  return `<section class="sorting">
        <h2 class="sr-only">Sorting section</h2>
        <div class="container sorting-layout">
          <div class="genres-chips">
            <button class="genres-chips-btn-left" title="left-arrow" data-control="left">
              <svg class="icon left-arrow">
                <use xlink:href="./src/svgSprite.svg#main-left-arrow"></use>
              </svg>
            </button>

            <ul class="genres-chips-list snaps-inline">
              ${genresListItems}             
            </ul>

            <button class="genres-chips-btn-right" title="right-arrow" data-control="right">
              <svg class="icon right-arrow">
                <use xlink:href="./src/svgSprite.svg#main-right-arrow"></use>
              </svg>
            </button>
          </div>

          <label for="sortingDropdown" class="dropdown"
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
          </label>
        </div>
      </section>`;
};

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
const heroSectionMarkup = (data) => {
  const {
    backdrop_path,
    genre_ids,
    id,
    original_title,
    title,
    overview,
    poster_path,
    release_date,
  } = data[3];

  return `<section class="hero" >
      <div class="hero-img-wrap" style="background-image:url('${createPoster(poster_path)}')"></div>
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
            <button class="hero-controls-arrows_left" title="left-arrow">
              <svg class="icon left-arrow">
                <use xlink:href="./src/svgSprite.svg#main-left-arrow"></use>
              </svg>
            </button>
            <button class="hero-controls-arrows_right" title="right-arrow">
              <svg class="icon right-arrow">
                <use xlink:href="./src/svgSprite.svg#main-right-arrow"></use>
              </svg>
            </button>

            <div class="hero-controls-btns">
              <button class="hero-controls-showMore poppins-medium">
                Show more
              </button>
              <button class="hero-controls-addToQueque poppins-medium">
                Add to queque
              </button>
            </div>

            <div class="hero-radiobuttons">
              <label for="hero_option-1" class="hero-radiobuttons_item"
                ><input
                  type="radio"
                  id="hero_option-1"
                  name="hero-radiobutton" /><span
                  title="Option1"
                  class="checkmark"
                ></span
              ></label>

              <label for="hero_option-2" class="hero-radiobuttons_item"
                ><input
                  type="radio"
                  id="hero_option-2"
                  name="hero-radiobutton"
                  checked /><span title="Option2" class="checkmark"></span
              ></label>

              <label for="hero_option-3" class="hero-radiobuttons_item"
                ><input
                  type="radio"
                  id="hero_option-3"
                  name="hero-radiobutton" /><span
                  title="Option3"
                  class="checkmark"
                ></span
              ></label>

              <label for="hero_option-4" class="hero-radiobuttons_item"
                ><input
                  type="radio"
                  id="hero_option-4"
                  name="hero-radiobutton" /><span
                  title="Option4"
                  class="checkmark"
                ></span
              ></label>
            </div>

            <div class="hero-desktop-controls">
              <span class="hero-desktop-controls-value" data-value="1">01</span>

              <span class="hero-desktop-controls-value" data-value="5">05</span>
            </div>
          </div>
        </div>
      </section>`;
};

const mobileGenresSectionMarkup = () => {
  return `<section class="mobile-genres">
        <div class="container">
          <div class="section-heading">
            <h2 class="section-title">Genres</h2>
            <a href="#" class="section-expand-link">View all...</a>
          </div>
          <ul class="mobile-genres-list snaps-inline">
            ${genresArr
              .map((genre) => {
                return `<li class="mobile-genres-list_item">
              <button href="#" class="mobile-genres-btn" data-genreid="${genre.id}">
                <div class="mobile-genres-icon-wrap">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#${genre.icon}"></use>
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

const sliderGalleryItemGenres = (genreIds) => {
  let genresMarkup = "";
  genresListData.genres.forEach((genre) => {
    if (genreIds.includes(genre.id))
      genresMarkup += `<li class="gallery-list_item-genres_item">
        <a href="#" data-genreid="${genre.id}">${genre.name}</a>
      </li>`;
  });
  return genresMarkup;
};
const sliderGalleryItem = (data) => {
  const poster = data.poster_path
    ? secure_base_url + poster_sizes[poster_sizes.length - 1] + data.poster_path
    : fallbackImg;
  return `<li class="gallery-list_item" data-filmId=${data.id}>
              <div class="gallery-list_item-img-wrap">
                <img src="${poster}" alt="${data.title}" />
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
                <h3 class="gallery-list_item-title">${data.original_title}</h3>
                <p class="gallery-list_item-year">${data.release_date.slice(0, 4)}</p>
                <ul class="gallery-list_item-genres">
                  ${sliderGalleryItemGenres(data.genre_ids)}
                </ul>
              </div>
            </li>`;
};
const sliderGallerySectionMarkup = (title, data) => {
  return `<section class="slider-gallery">
        <div class="container">
          <div class="section-heading">
            <h2 class="section-title">${title}</h2>
            <a href="#" class="section-expand-link">View all...</a>
          </div>

          <ul class="gallery-list-slider snaps-inline">
            ${data.map((film) => sliderGalleryItem(film)).join("")}
          </ul>
        </div>
      </section>`;
};

const genresList = (genreIds) => {
  const genresList = [];
  genresListData.genres.forEach((i) => {
    if (genreIds.includes(i.id))
      genresList.push(
        `<li class="genres-list_item" data-genreid="${i.id}"><a href="">${i.name}</a></li>`,
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
                    <use xlink:href="./src/svgSprite.svg#main-star"></use>
                  </svg>
                  <span>${vote_average.toFixed(2)}</span>
                </div>
                <div class="imdbIcon">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#main-imdb"></use>
                  </svg>
                </div>
              </div>

              <div class="gallery-list_item-desc">
                <h3 class="gallery-list_item-title">${title}</h3>
                <p class="gallery-list_item-year">${release_date.slice(0, 4)}</p>
                <ul class="genres-list">
                  ${genresList(genre_ids)}
                </ul>
              </div>
            </li>`;
};
const mainGallerySectionMarkup = (title, data) => {
  return `<section class="main-gallery">
        <div class="container">
        <h2>Films in the category ${title}</h2>
          <ul class="gallery-list">
            ${data.map((film) => mainGallerySectionItem(film)).join("")}
          </ul>
        </div>
      </section>`;
};

const genresSectionMarkup = () => {
  return `<section class="genresSection">
        <div class="container">
          <ul class="genresSection-list">
            ${genresArr
              .map(
                (
                  genre,
                ) => `<li class="genresSection-list_item" data-genreid="${genre.id}">
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

const savedGalleryItemGenres = (genreIds) => {
  const genresList = [];
  genresListData.genres.forEach((i) => {
    if (genreIds.includes(i.id))
      genresList.push(
        `<li class="gallery-list_item-genres_item" data-genreid="${i.id}">${i.name}</li>`,
      );
  });
  return genresList.join("");
};
const savedGalleryItem = (data) => {
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
  return `<li class="saved-gallery-list_item" data-filmid="${id}">
              <button class="closeBtn" type="button" title="removeElement">
                <svg class="icon cross-icon">
                  <use xlink:href="./src/svgSprite.svg#main-cross-1"></use>
                </svg>
              </button>
              <div class="img-wrap">
                <img src="${createPoster(poster_path)}" alt="${title}" />
                <a href="" title="item-link" class="item-link"></a>
              </div>
              <div class="raiting">
                <div class="raiting-value">
                  <svg class="icon star-icon">
                    <use xlink:href="./src/svgSprite.svg#main-star"></use>
                  </svg>
                  <span>${vote_average.toFixed(2)}</span>
                </div>
                <div class="imdbIcon">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#main-imdb"></use>
                  </svg>
                </div>
              </div>
              <div class="saved-gallery-list_item-desc">
                <h3 class="title">${title}</h3>
                <p class="year">${release_date.slice(0, 4)}</p>
                <ul class="gallery-list_item-genres">
                  ${savedGalleryItemGenres(genre_ids)}                  
                </ul>
              </div>
            </li>`;
};
const savedGalleryMarkup = (data) => {
  return `<section class="saved-gallery">
        <div class="container">
          <h2 class="saved-gallery_title sr-only">Watchlist</h2>
          <ul class="saved-gallery-list">
            ${data.map((film) => savedGalleryItem(film)).join("")}
          </ul>
        </div>
      </section>`;
};

const paginationButtonsList = (data) => {
  let page = Number(data.page);
  let total_pages = Number(data.total_pages);
  // total_pages are limited as 500 but backend has bug with big numbers, so fix:
  if (total_pages > 500) total_pages = 500;

  const mainBtnList = [];
  if (total_pages <= 7) {
    for (let i = 1; i <= total_pages; i += 1) mainBtnList.push(i);
    return mainBtnList;
  }
  if (page < 7) return [1, 2, 3, 4, 5, 6, 7, "...", total_pages];
  if (page >= 7 && page < total_pages - 5) {
    for (let i = page - 3; i < page + 3; i += 1) mainBtnList.push(i);
    return [1, "...", ...mainBtnList, "...", total_pages];
  }
  for (let i = total_pages - 6; i <= total_pages; i += 1) mainBtnList.push(i);
  return [1, "...", ...mainBtnList];
};

const paginationSectionMarkup = (data) => {
  console.log(data);
  // const { page, total_pages, results, total_results } = data;

  const buttonsList = paginationButtonsList(data);
  if (buttonsList.length < 2) {
    // paginationRoot.innerHTML = "";
    return "";
  }

  let mainPagButtons = buttonsList
    .map((i) => {
      if (i === "...") {
        return `<div class="pageEllipsis">
          <svg class="icon dots-icon">
            <use xlink:href="./src/svgSprite.svg#main-dots"></use>
          </svg>
        </div>`;
      } else {
        return `<button class="pagBtn" data-page="${i}">
          ${i}
        </button>`;
      }
    })
    .join("");

  let arrowsMarkupObj = {
    rightArrow: `<button class="rightArrow" data-control="right" title="right-arrow">
            <svg class="icon right-arrow">
              <use xlink:href="./src/svgSprite.svg#main-right-arrow"></use>
            </svg>
          </button>`,
    leftArrow: `<button class="leftArrow" data-control="left" title="left-arrow">
            <svg class="icon left-arrow">
              <use xlink:href="./src/svgSprite.svg#main-left-arrow"></use>
            </svg>
          </button>`,
  };

  const resMarkup =
    arrowsMarkupObj.leftArrow + mainPagButtons + arrowsMarkupObj.rightArrow;

  console.log(resMarkup);

  return `<section class="pagination">
        <div class="container pagination-layout">
          <h2 class="sr-only">Pagination</h2>
          ${resMarkup}
          </div>
      </section>`;
};

const tabletHomeSectionGallery = (title = "") => {
  return `<section class="saved-gallery">
        <div class="container">
          <h2 class="saved-gallery_title">${title}</h2>
          <ul class="saved-gallery-list">
            <li class="saved-gallery-list_item">
              
              <div class="img-wrap">
                <img src="./src/blank-picture.png" alt="pic" />
                <a href="" title="item-link" class="item-link"></a>
              </div>
              <div class="raiting">
                <div class="raiting-value">
                  <svg class="icon star-icon">
                    <use xlink:href="./src/svgSprite.svg#main-star"></use>
                  </svg>
                  <span>8.6</span>
                </div>
                <div class="imdbIcon">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#main-imdb"></use>
                  </svg>
                </div>
              </div>
              <div class="saved-gallery-list_item-desc">
                <h3 class="title">Film name</h3>
                <p class="year">year</p>
                <ul class="gallery-list_item-genres">
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </section>`;
};

const tabletHomeSectionMarkup = () => {
  // return `<section class="tablet-home-section">${mainPageInfoSectionMarkup() + sortingSectionMarkup() + tabletHomeSectionGallery("Tranding")}</section>`;
  return `<section class="tablet-home-section">nothing at the time</section>`;
};

const mobileModalMenuMarkup = () => {
  return `<div class="mobile-modal-menu isOpen">
        <button class="modal-closeBtn">
          <svg class="icon close-icon">
            <use xlink:href="./src/svgSprite.svg#main-cross-1"></use>
          </svg>
        </button>
        <ul class="main-links-list">
          <li class="main-links-list_item">
            <a href="/">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-home"></use>
              </svg>
              Home
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/movies">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>
              Movies
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="#">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-saved"></use>
              </svg>
              Genres
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="#">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>
              Watchlist
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="#">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-history"></use>
              </svg>
              History
            </a>
          </li>
        </ul>

        <h2 class="mobile-modal-menu-title">Your Library</h2>
        <ul class="library-links-list">
          <li class="library-links-list_item">
            <a href="#">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>
              Favorites
            </a>
          </li>

          <li class="library-links-list_item">
            <a href="#">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-queue"></use>
              </svg>
              In Queque
            </a>
          </li>
        </ul>

        <ul class="settings-links-list">
          <li class="settings-links-list_item">
            <a href="#">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-settings"></use>
              </svg>
              Settings
            </a>
          </li>

          <li class="settings-links-list_item">
            <a href="#">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-logout"></use>
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </div>`;
};

export {
  headerMarkup,
  mainPageInfoSectionMarkup,
  sortingSectionMarkup,
  heroSectionMarkup,
  mobileGenresSectionMarkup,
  sliderGallerySectionMarkup,
  mainGallerySectionMarkup,
  genresSectionMarkup,
  savedGalleryMarkup,
  paginationSectionMarkup,
  tabletHomeSectionMarkup,
  mobileModalMenuMarkup,
};
