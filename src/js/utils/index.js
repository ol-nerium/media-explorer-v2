import { getGenresList } from "../services/apiService";
import {
  fullCardWatchlistBtn,
  headerMenuRef,
  headerTitle,
  heroQuequeBtn,
  mainPageInfoTitleRef,
  mobileModalMenuRef,
  sortingDropdownRef,
} from "../services/refs";
import { getUrlInfo } from "../services/urlInfoService";
import { getFromLS } from "../services/localStorageService";
import {
  base_url,
  secure_base_url,
  backdrop_sizes,
  logo_sizes,
  poster_sizes,
  profile_sizes,
  still_sizes,
} from "./data";

export const fallbackImg = "./src/blank-picture.png";

export const genresListData = await getGenresList();
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
export const genresArr = genresListData.genres.map((item) => {
  return { ...item, icon: genreIcons[item.name] };
});

export const createPoster = (poster_path) => {
  return poster_path
    ? secure_base_url + poster_sizes[poster_sizes.length - 3] + poster_path
    : fallbackImg;
};

export const createAvatar = (avatar_path) => {
  return avatar_path
    ? secure_base_url + profile_sizes[profile_sizes.length - 3] + avatar_path
    : fallbackImg;
};

export const createBackdropBackgound = (backdrop_path) => {
  if (!backdrop_path) return null;
  return (
    secure_base_url + backdrop_sizes[backdrop_sizes.length - 3] + backdrop_path
  );
};

export function changeTitleText(titleText) {
  const headerTitleNarrowScreen = headerTitle();
  const headerTitleWideScreen = mainPageInfoTitleRef();

  if (headerTitleNarrowScreen) headerTitleNarrowScreen.textContent = titleText;
  if (headerTitleWideScreen) headerTitleWideScreen.textContent = titleText;
}

export function removeDubles(array) {
  let resArr = [];

  array.forEach((item) => {
    if (!resArr.includes(item)) resArr.push(item);
  });
  return resArr;
}

export function changeQuequeBtnTextByFilmId(filmId) {
  const isFilmInQueque = getFromLS("quequeFilmsList").includes(filmId);
  const heroBtn = heroQuequeBtn();
  const fullCardBtn = fullCardWatchlistBtn();

  if (heroBtn) {
    heroBtn.textContent = isFilmInQueque
      ? "Remove from queque"
      : "Add to queque";
  }

  if (fullCardBtn) {
    fullCardBtn.textContent = isFilmInQueque
      ? "Remove from queque"
      : "Add to queque";
  }
}

export function changeActiveNavLinkColor() {
  const headerMenuRoot = headerMenuRef();
  const mobileMenuRoot = mobileModalMenuRef();
  const { pathName } = getUrlInfo();

  const links = [
    ...Array.from(headerMenuRoot?.querySelectorAll("a") || []),
    ...Array.from(mobileMenuRoot?.querySelectorAll("a") || []),
  ];

  links.forEach((link) => {
    const linkUrl = new URL(link.href);
    const linkPathName = linkUrl.pathname.slice(1);
    if (linkPathName === pathName && !!link.closest("li")) {
      link.closest("li").classList.add("active");
    }

    if (linkPathName !== pathName && !!link.closest("li")) {
      link.closest("li").classList.remove("active");
    }
  });
}

export function changeCheckedSortSelect() {
  const dropDown = sortingDropdownRef();
  const optionsArray = Array.from(dropDown?.querySelectorAll("option") || []);
  if (optionsArray < 1) return;
}
