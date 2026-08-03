import { heroSectionMarkup } from "../components/hero";
import { mobileGenresSectionMarkup } from "../components/mobileGenresSection";
import { sliderGallerySectionMarkup } from "../components/sliderGallery";
import { heroSliderData, popularObj, topRatedObj, upcomingObj } from "../data";

const gallerySliderSectionsTitles = {
  POPULAR: "popular",
  TOPRATED: "top rated",
  UPCOMING: "upcoming",
};

export const homePage = () => {
  return (
    heroSectionMarkup(heroSliderData) +
    mobileGenresSectionMarkup() +
    sliderGallerySectionMarkup(
      gallerySliderSectionsTitles.POPULAR,
      popularObj.results,
    ) +
    sliderGallerySectionMarkup(
      gallerySliderSectionsTitles.TOPRATED,
      topRatedObj.results,
    ) +
    sliderGallerySectionMarkup(
      gallerySliderSectionsTitles.UPCOMING,
      upcomingObj.results,
    )
  );
};
