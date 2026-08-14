import { fullCardMarkup } from "../components/fullCard";
import {
  getCreditsByFilmId,
  getMovieById,
  getReviewsByFilmId,
  getSimilarMoviesById,
} from "../services/apiService";
import { listenersReload } from "../services/refs";
import { setFilmCardUrlInfo } from "../services/routing";
import { openModal } from "./modalInterface";
import { hideLoader, showLoader } from "./notificationInterface";

// let prevScrollPostion = 0;
export function openFilmCard(filmId) {
  if (!filmId) {
    console.log("no film id");
    return;
  }

  showLoader();

  Promise.all([
    getMovieById(filmId),
    getCreditsByFilmId(filmId),
    getReviewsByFilmId(filmId),
    getSimilarMoviesById(1, filmId),
    // getExternalFilmVideosById(filmId),
  ])
    .then(([mainData, credits, reviews, similar]) => {
      const filmData = { mainData, credits, reviews, similar };

      setFilmCardUrlInfo(filmData.mainData.id);
      const filmCardMarkup = fullCardMarkup(filmData);

      openModal(`<section class="full-card">${filmCardMarkup}</section>`);

      listenersReload();
    })
    .catch((err) => {
      console.log("get error fetching full card of film:", err);
      if (err.status === 404) {
        console.log("no such film by id");
        //  :
        // const currentUrlInfo = getUrlInfo();
        // currentUrlInfo.filmId = null;
        // setUrlInfo(currentUrlInfo);
        // handleLocation();
      }
    })
    .finally(() => hideLoader());
}
