import { pathObject } from "../services/routing";
import { navListIcons } from "../../main";

// navListIcons

const createMobileMenuLinks = (pathsObj) => {
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

  return `
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

        <h2 class="mobile-modal-menu-title">Your Library</h2>
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

export const mobileModalMenuMarkup = () => {
  return `<div class="mobile-modal-menu isOpen">
        <button class="modal-closeBtn">
          <svg class="icon close-icon">
            <use xlink:href="./src/svgSprite.svg#main-cross-1"></use>
          </svg>
        </button>
        ${createMobileMenuLinks(pathObject)}
      </div>`;
};
