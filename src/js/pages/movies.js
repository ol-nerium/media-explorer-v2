import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import {
  createDropdownMarkup,
  createGenreChipsListMarkup,
  sortingSectionMarkup,
} from "../components/sortingSection";
import { appState } from "../services/routing";
import { popularObj } from "../utils/data";

export const moviesPage = (
  title = null,
  // galleryData = { results: [], page: 1 },
  galleryData = popularObj,
) => {
  // console.log(galleryData);
  return (
    mainPageInfoSectionMarkup() +
    sortingSectionMarkup(
      createGenreChipsListMarkup(appState.genres),
      createDropdownMarkup(),
    ) +
    mainGallerySectionMarkup(title, galleryData.results) +
    paginationSectionMarkup(galleryData)
  );
};

export const searchedMoviesPage = (
  searchQuery = "your search query",
  galleryData = { results: [], page: 1 },
) => {
  return (
    mainPageInfoSectionMarkup(searchQuery) +
    mainGallerySectionMarkup(
      "Search for:<span>" +
        searchQuery.trim() +
        "</span>, page: <span>" +
        galleryData.page +
        "</span>",
      galleryData.results,
    ) +
    paginationSectionMarkup(galleryData)
  );
};
