import { getGenresList, getImageConfiguration } from "../services/apiService";

const configuration = await getImageConfiguration();
const {
  base_url,
  secure_base_url,
  backdrop_sizes,
  logo_sizes,
  poster_sizes,
  profile_sizes,
  still_sizes,
} = configuration.images;
export const fallbackImg = "./src/blank-picture.png";

// console.log(configuration);

export const genresListData = await getGenresList();
const genreIcons = {
  Action: "genres-action",
  Adventure: "genres-adventure",
  Animation: "genres-animation",
  Comedy: "genres-comedy",
  Crime: "genres-crime",
  Documentary: "genres-documentary",
  Drama: "genres-drama",
  Family: "genres-family",
  Fantasy: "genres-fantazy",
  History: "genres-history",
  Horror: "genres-horror",
  Music: "genres-music",
  Mystery: "genres-mystery",
  Romance: "genres-romance",
  "Science Fiction": "genres-science",
  "TV Movie": "genres-tv",
  Thriller: "genres-thriller",
  War: "genres-war",
  Western: "genres-western",
};
export const genresArr = genresListData.genres.map((item) => {
  return { ...item, icon: genreIcons[item.name] };
});

export const createPoster = (poster_path) => {
  return poster_path
    ? secure_base_url + poster_sizes[poster_sizes.length - 1] + poster_path
    : fallbackImg;
};

export const createAvatar = (avatar_path) => {
  return avatar_path
    ? secure_base_url + profile_sizes[profile_sizes.length - 1] + avatar_path
    : fallbackImg;
};

export const createBackdropBackgound = (backdrop_path) => {
  return (
    secure_base_url + backdrop_sizes[backdrop_sizes.length - 1] + backdrop_path
  );
};

export function changeTitleText(pathName) {
  const headerTitleNarrowScreen = document.querySelector(".headerTitle");
  const headerTitleWideScreen = document.querySelector(".main-page-info-title");

  if (headerTitleNarrowScreen) headerTitleNarrowScreen.textContent = pathName;
  if (headerTitleWideScreen) headerTitleWideScreen.textContent = pathName;
}
