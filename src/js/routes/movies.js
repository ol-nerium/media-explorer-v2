import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import {
  createDropdownMarkup,
  createGenreChipsListMarkup,
  sortingSectionMarkup,
} from "../components/sortingSection";
import { activeGenresArr } from "../interfaces/sortingInterface";

export const moviesPage = (
  title = "Default",
  galleryData = { results: [], page: 1 },
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
  searchQuery = "Default",
  galleryData = { results: [], page: 1 },
) => {
  return (
    mainPageInfoSectionMarkup(searchQuery) +
    sortingSectionMarkup(createGenreChipsListMarkup(activeGenresArr)) +
    mainGallerySectionMarkup(
      "Search for <span>" + searchQuery + "</span>",
      galleryData.results,
    ) +
    paginationSectionMarkup(galleryData)
  );
};
