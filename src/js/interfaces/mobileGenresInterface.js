let genreListArr = [];

export const mobileGenresInterface = (evt) => {
  //   console.log(evt);
  const target = evt.target;
  let genreBtn;
  if (target.nodeName === "button") {
    genreBtn = target;
  }
  if (
    target.nodeName !== "button" &&
    target.closest("button")?.dataset?.genreid
  ) {
    genreBtn = target.closest("button");
  } else return;

  const clickedGenreId = target.closest("button").dataset.genreid;
  if (genreListArr.includes(clickedGenreId)) {
    genreListArr = genreListArr.filter((i) => i !== clickedGenreId);
  } else {
    genreListArr.push(clickedGenreId);
  }
  mobileGenresClasswork();
  return genreListArr;
};

function mobileGenresClasswork() {
  Array.from(document.querySelectorAll(".mobile-genres-btn")).forEach(
    (chip) => {
      if (genreListArr.includes(chip.dataset.genreid)) {
        chip.classList.add("active");
      } else chip.classList.remove("active");
    },
  );
}
