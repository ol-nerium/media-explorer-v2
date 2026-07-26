import {
  headerMarkup,
  mainPageInfoSectionMarkup,
  sortingSectionMarkup,
  heroSectionMarkup,
  mobileGenresSectionMarkup,
  trandingSectionMarkup,
  mainGallerySectionMarkup,
  genresSectionMarkup,
  savedGalleryMarkup,
  paginationSectionMarkup,
} from "./sectionCreate";

const homePage = () => {
  return (
    // headerMarkup() +
    heroSectionMarkup() + mobileGenresSectionMarkup() + trandingSectionMarkup()
  );
};

const moviesPage = () => {
  return (
    mainPageInfoSectionMarkup() +
    sortingSectionMarkup() +
    mainGallerySectionMarkup() +
    paginationSectionMarkup()
  );
};

const genresPage = () => {
  return mainPageInfoSectionMarkup() + genresSectionMarkup();
};

const watchlistPage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup();
};

const historyPage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup();
};
const favoritesPage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup();
};
const queuePage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup();
};
const settingsPage = () => {};
const logoutPage = () => {};

export {
  homePage,
  moviesPage,
  genresPage,
  watchlistPage,
  historyPage,
  favoritesPage,
  queuePage,
};
