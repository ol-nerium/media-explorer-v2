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
import { errorToaster, infoToaster, successToaster } from "./toaster";

// let prevScrollPostion = 0;
export function openFilmCard(filmId) {
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
      successToaster({ message: "Opened film:" });
      infoToaster({
        message: mainData.title || mainData.original_title,
      });
    })
    .catch((err) => {
      if (err.status === 404) {
        // console.log("no such film by id");
        errorToaster({ message: "No such film in the base" });
        return;
      }
      errorToaster({ message: "Something went wrong, try later" });
    })
    .finally(() => hideLoader());
}
