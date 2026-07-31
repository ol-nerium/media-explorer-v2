import { openGalleryByGenres } from "../../main";

export const genresSectionInterface = (evt) => {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) return;
  const chipGenreId = evt.target.closest("li").dataset.genreid;
  console.log([chipGenreId]);
  openGalleryByGenres(1, [chipGenreId]);
};
