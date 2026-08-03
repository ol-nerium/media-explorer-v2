import { genresSectionMarkup } from "../components/genresSection";
import { mainPageInfoSectionMarkup } from "../components/mainPageInfo";

export const genresPage = () => {
  return mainPageInfoSectionMarkup() + genresSectionMarkup();
};
