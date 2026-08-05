import { openGalleryByGenres } from "../../main";

export const genresSectionInterface = (evt) => {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) return;
  let targetItem = null;
  if (evt.target.nodeName === "LI") targetItem = evt.target;
  if (evt.target.closest("li")) targetItem = evt.target.closest("li");
  // const chipGenreId = evt.target.closest("li").dataset.genreid;
  console.log(targetItem?.dataset?.genreid);
  // console.log([chipGenreId]);
  //
  if (!targetItem) return;

  const chipGenreId = targetItem?.dataset?.genreid;
  if (chipGenreId) openGalleryByGenres(1, [chipGenreId]);
};
