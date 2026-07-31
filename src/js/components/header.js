import { pathObject } from "../routingMarkup";

const mobileLayout = `<div class="container mobile-header-layout">
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
      </div>`;

export const navListIcons = {
  logo: `<svg class="icon">
            <use xlink:href="./src/svgSprite.svg#Logo-icon"></use>
          </svg>`,
  home: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-home"></use>
              </svg>`,
  movies: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>`,
  genres: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-saved"></use>
              </svg>`,
  popular: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>`,
  "top rated": `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>`,
  upcoming: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>`,
  favorites: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>`,
  queue: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-queue"></use>
              </svg>`,
  settings: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-settings"></use>
              </svg>`,
  logout: `<svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-logout"></use>
              </svg>`,
};

const createHeaderMenu = (pathsObj) => {
  const mainLinks = [
    pathsObj.home,
    pathsObj.movies,
    pathsObj.genres,
    pathsObj.popular,
    pathsObj.toprated,
    pathsObj.upcoming,
  ];
  const libraryLinks = [pathsObj.favorites, pathsObj.queue];
  const settingsLinks = [pathsObj.settings, pathsObj.logout];
  return `<div class="header-menu-layout">
        <a href="/" title="logo" class="logo">
          ${navListIcons.logo}
        </a>

        <ul class="main-links-list">
          ${mainLinks
            .map(
              (item) => `<li class="main-links-list_item">
            <a href="${item.path}">
            ${navListIcons[item.name]}  
              ${item.name}
            </a>
          </li>`,
            )
            .join("")}         
        </ul>

        <h2 class="library-links_title">Your Library</h2>
        <ul class="library-links-list">

        ${libraryLinks
          .map(
            (item) => `<li class="library-links-list_item">
            <a href="${item.path}">
            ${navListIcons[item.name]}  
              ${item.name}
            </a>
          </li>`,
          )
          .join("")} 
        </ul>

        <ul class="settings-links-list">
          

          ${settingsLinks
            .map(
              (item) => `<li class="settings-links-list_item">
            <a href="${item.path}">
            ${navListIcons[item.name]}  
            ${item.name}
            </a>
          </li>`,
            )
            .join("")}
        </ul>
      </div>`;
};

export const headerMarkup = () => {
  return `<header class="header">
      ${mobileLayout}
      ${createHeaderMenu(pathObject)}

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
                <input id="search-field" name="search-field" placeholder="Search for movies..." />
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
