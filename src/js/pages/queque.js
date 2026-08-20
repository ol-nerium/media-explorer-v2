import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import { savedGalleryMarkup } from "../components/savedGallery";

export const queuePage = (filmData) => {
  return (
    mainPageInfoSectionMarkup() +
    savedGalleryMarkup(filmData.results) +
    paginationSectionMarkup(filmData)
  );
};
