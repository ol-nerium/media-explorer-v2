import { genresSectionMarkup } from "../components/genresSection";
import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import {
  createDropdownMarkup,
  createGenreChipsListMarkup,
  sortingSectionMarkup,
} from "../components/sortingSection";
import { appState } from "../services/routing";

export const genresPage = () => {
  return mainPageInfoSectionMarkup() + genresSectionMarkup();
};

export const searchedByGenresPage = (
  genresListNames = "genres",
  galleryData = { results: [], page: 1 },
) => {
  return (
    mainPageInfoSectionMarkup(genresListNames) +
    sortingSectionMarkup(
      createGenreChipsListMarkup(appState.genres) + createDropdownMarkup(),
    ) +
    mainGallerySectionMarkup(
      "Search for <span>" + genresListNames + "</span>",
      galleryData.results,
    ) +
    paginationSectionMarkup(galleryData)
  );
};
