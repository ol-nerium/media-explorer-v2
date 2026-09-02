import { total_pages } from "../components/pagination";
import { handleLocation, pathObject } from "../services/routing";
import { getUrlInfo, setUrlInfo } from "../services/urlInfoService";
import { hideLoader, showLoader } from "../interfaces";
import { loaderInterface } from "./loaderInterface";

export const paginationInterface = async (evt) => {
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
      await loaderInterface(() =>
        fetchFilmDataFromPagination(newPageValue, pathName),
      );
    }
    if (control === "right") {
      newPageValue += 1;
      if (newPageValue > total_pages) return;
      await loaderInterface(() =>
        fetchFilmDataFromPagination(newPageValue, pathName),
      );
    }
  }
  if (buttonElem?.dataset?.page) {
    const page =
      buttonElem.dataset.page && !isNaN(buttonElem.dataset.page)
        ? Number(buttonElem.dataset.page)
        : 1;
    await loaderInterface(() => fetchFilmDataFromPagination(page, pathName));
  }
};

async function fetchFilmDataFromPagination(page, pathName) {
  const currentUrlInfo = getUrlInfo();
  const newUrlParams = { ...currentUrlInfo, page, pathName };
  setUrlInfo(newUrlParams);

  await handleLocation();
}
