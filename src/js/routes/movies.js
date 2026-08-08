import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import {
  createDropdownMarkup,
  createGenreChipsListMarkup,
  sortingSectionMarkup,
} from "../components/sortingSection";
import { activeGenresArr } from "../services/routing";
import { popularObj } from "../data";

export const moviesPage = (
  title = "Default",
  // galleryData = { results: [], page: 1 },
  galleryData = popularObj,
) => {
  return (
    mainPageInfoSectionMarkup() +
    sortingSectionMarkup(
      createGenreChipsListMarkup(activeGenresArr),
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
    // sortingSectionMarkup(createGenreChipsListMarkup(activeGenresArr)) +
    mainGallerySectionMarkup(
      "Search for <span>" + searchQuery + "</span>",
      galleryData.results,
    ) +
    paginationSectionMarkup(galleryData)
  );
};

export const searchedByGenresMoviesPage = (
  genresListNames = "genres",
  galleryData = { results: [], page: 1 },
) => {
  return (
    mainPageInfoSectionMarkup(genresListNames) +
    sortingSectionMarkup(
      createGenreChipsListMarkup(activeGenresArr) + createDropdownMarkup(),
    ) +
    mainGallerySectionMarkup(
      "Search for <span>" + genresListNames + "</span>",
      galleryData.results,
    ) +
    paginationSectionMarkup(galleryData)
  );
};
