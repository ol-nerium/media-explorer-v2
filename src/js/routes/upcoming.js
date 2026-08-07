import { mainGallerySectionMarkup } from "../components/mainGallerySection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import { upcomingObj } from "../data";

export const upcomingPage = (
  title = "Default",
  // galleryData = { results: [], page: 1 },
  galleryData = upcomingObj,
) => {
  return (
    mainPageInfoSectionMarkup() +
    mainGallerySectionMarkup(title, upcomingObj.results) +
    paginationSectionMarkup(galleryData)
  );
};
