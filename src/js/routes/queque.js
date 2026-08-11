import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import { savedGalleryMarkup } from "../components/savedGallery";

export const queuePage = (filmData) => {
  console.log(filmData);

  return (
    mainPageInfoSectionMarkup() +
    savedGalleryMarkup(filmData.results) +
    paginationSectionMarkup(filmData)
  );
};
