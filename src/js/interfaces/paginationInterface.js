import { total_pages } from "../components/pagination";
import { handleLocation, pathObject } from "../services/routing";
import { getUrlInfo, setUrlInfo } from "../services/urlInfoService";
import { hideLoader, showLoader } from "../interfaces";

export const paginationInterface = (evt) => {
  let { page, pathName } = getUrlInfo();
  page = page && !isNaN(page) ? Number(page) : 1;

  let buttonElem = null;
  if (evt.target.nodeName === "BUTTON") buttonElem = evt.target;
  if (evt.target?.closest("button")) buttonElem = evt.target.closest("button");

  const control = buttonElem?.dataset?.control;
  if (control) {
    let newPageValue = page ? page : 1;
    if (control === "left") {
      newPageValue -= 1;
      if (newPageValue < 1) return;
      showLoader();
      fetchFilmDataFromPagination(newPageValue, pathName);
      hideLoader();
    }
    if (control === "right") {
      newPageValue += 1;
      if (newPageValue > total_pages) return;
      showLoader();
      fetchFilmDataFromPagination(newPageValue, pathName);
      hideLoader();
    }
  }
  if (buttonElem?.dataset?.page) {
    const page =
      buttonElem.dataset.page && !isNaN(buttonElem.dataset.page)
        ? Number(buttonElem.dataset.page)
        : 1;
    showLoader();
    fetchFilmDataFromPagination(page, pathName);
    hideLoader();
  }
};

async function fetchFilmDataFromPagination(page, pathName) {
  const currentUrlInfo = getUrlInfo();
  const newUrlParams = { ...currentUrlInfo, page, pathName };
  setUrlInfo(newUrlParams);

  showLoader();
  handleLocation();
  hideLoader();
}
