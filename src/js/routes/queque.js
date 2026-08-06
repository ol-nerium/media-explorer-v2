import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { paginationSectionMarkup } from "../components/pagination";
import { savedGalleryMarkup } from "../components/savedGallery";

import { quequeObj } from "../data";

export const queuePage = () => {
  // if(quequeObj)
  const filmData = quequeObj.map((i) => i.value);
  // pagination need fix  - filmData should be paginated and fixed
  return (
    mainPageInfoSectionMarkup() +
    savedGalleryMarkup(filmData) +
    paginationSectionMarkup(filmData)
  );
};
