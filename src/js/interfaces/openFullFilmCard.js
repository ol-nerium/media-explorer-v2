import { fullCardMarkup } from "../components/fullCard";
import {
  getCreditsByFilmId,
  getMovieById,
  getReviewsByFilmId,
  getSimilarMoviesById,
} from "../services/apiService";
import { backdropRef, listenersReload } from "../services/refs";
import { setFilmCardUrlInfo } from "../services/routing";
import { getUrlInfo, setUrlInfo } from "../services/urlInfoService";
import { openModal } from "./modalInterface";

// let prevScrollPostion = 0;
export function openFilmCard(filmId) {
  if (!filmId) {
    console.log("no film id");
    return;
  }

  Promise.all([
    getMovieById(filmId),
    getCreditsByFilmId(filmId),
    getReviewsByFilmId(filmId),
    getSimilarMoviesById(filmId),
  ])
    .then(([mainData, credits, reviews, similar]) => {
      const filmData = { mainData, credits, reviews, similar };
      // console.log(filmData);

      setFilmCardUrlInfo(filmData.mainData.id);
      const filmCardMarkup = fullCardMarkup(filmData);

      openModal(`<section class="full-card">${filmCardMarkup}</section>`);

      listenersReload();
    })
    .catch((err) => {
      console.log("get error fetching full card of film:", err);
      console.log(err.status);
      if (err.status === 404) {
        console.log("no such film by id, redirecting...");
        //  :
        const currentUrlInfo = getUrlInfo();
        currentUrlInfo.filmId = null;
        console.log(currentUrlInfo);
        setUrlInfo(currentUrlInfo);
        // handleLocation();
      }
    });
}
