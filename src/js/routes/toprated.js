import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import { topRatedObj } from "../data";

export const topRatedPage = (
  title = null,
  // galleryData = { results: [], page: 1 },
  galleryData = topRatedObj,
) => {
  return (
    mainPageInfoSectionMarkup() +
    mainGallerySectionMarkup(title, galleryData.results) +
    paginationSectionMarkup(galleryData)
  );
};
