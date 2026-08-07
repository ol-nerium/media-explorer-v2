import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import { topRatedObj } from "../data";

export const topRatedPage = (
  title = "Default",
  // galleryData = { results: [], page: 1 },
  galleryData = topRatedObj,
) => {
  return (
    mainPageInfoSectionMarkup() +
    // sortingSectionMarkup(
    //   createGenreChipsListMarkup(activeGenresArr),
    //   createDropdownMarkup(),
    // ) +
    mainGallerySectionMarkup(title, topRatedObj.results) +
    paginationSectionMarkup(galleryData)
  );
};
