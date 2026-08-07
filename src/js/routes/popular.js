import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import { popularObj } from "../data";

export const popularPage = (
  title = "Popular",
  // galleryData = { results: [], page: 1 },
  galleryData = popularObj,
) => {
  return (
    mainPageInfoSectionMarkup() +
    mainGallerySectionMarkup(title, galleryData.results) +
    paginationSectionMarkup(galleryData)
  );
};
