import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";
import { savedGalleryMarkup } from "../components/savedGallery";

export const favoritesPage = () => {
  return mainPageInfoSectionMarkup() + savedGalleryMarkup([]);
};
