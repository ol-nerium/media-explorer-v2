import { genresSectionMarkup } from "../components/genresSection";
import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import {
  createDropdownMarkup,
  createGenreChipsListMarkup,
  sortingSectionMarkup,
} from "../components/sortingSection";
import { activeGenresArr } from "../services/routing";

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
      createGenreChipsListMarkup(activeGenresArr) + createDropdownMarkup(),
    ) +
    mainGallerySectionMarkup(
      "Search for <span>" + genresListNames + "</span>",
      galleryData.results,
    ) +
    paginationSectionMarkup(galleryData)
  );
};
