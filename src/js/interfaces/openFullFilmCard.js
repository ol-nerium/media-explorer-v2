import { fullCardMarkup } from "../components/fullCard";
import {
  getCreditsByFilmId,
  getMovieById,
  getReviewsByFilmId,
  getSimilarMoviesById,
} from "../services/apiService";
import { listenersReload } from "../services/refs";
import { setFilmCardUrlInfo } from "../services/routing";
import { openModal } from "../interfaces";
import { errorToaster, infoToaster, successToaster } from "../interfaces";

export async function openFilmCard(filmId) {
  try {
    const [mainData, credits, reviews, similar] = await Promise.all([
      getMovieById(filmId),
      getCreditsByFilmId(filmId),
      getReviewsByFilmId(filmId),
      getSimilarMoviesById(1, filmId),
    ]);

    const filmData = { mainData, credits, reviews, similar };

    setFilmCardUrlInfo(filmData.mainData.id);
    const filmCardMarkup = fullCardMarkup(filmData);

    openModal(`<section class="full-card">${filmCardMarkup}</section>`);

    listenersReload();
    successToaster({ message: "Opened film:" });
    infoToaster({
      message: mainData.title || mainData.original_title,
    });

    return filmData;
  } catch (err) {
    if (err.status === 404) {
      errorToaster({ message: "No such film in the base" });
      console.log(err);

      return null;
    }
    errorToaster({ message: "Something went wrong, try later" });
    console.log(err);

    return null;
  }
}
