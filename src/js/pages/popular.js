import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import { popularObj } from "../utils/data";

export const popularPage = (
  title = null,
  // galleryData = { results: [], page: 1 },
  galleryData = popularObj,
) => {
  return (
    mainPageInfoSectionMarkup() +
    mainGallerySectionMarkup(null, galleryData.results) +
    paginationSectionMarkup(galleryData)
  );
};
