import { handleLocation, pathObject } from "../services/routing";
import { getUrlInfo, setUrlInfo } from "../services/urlInfoService";

export const paginationInterface = (evt) => {
  console.log(evt.target.nodeName);

  let { genres, page, pathName, search } = getUrlInfo();
  page = page && !isNaN(page) ? Number(page) : 1;

  let buttonElem = null;
  if (evt.target.nodeName === "BUTTON") buttonElem = evt.target;
  if (evt.target?.closest("button")) buttonElem = evt.target.closest("button");

  if (buttonElem?.dataset?.control) {
    console.log("control btn clicked", buttonElem, buttonElem.dataset.control);
  }
  if (buttonElem?.dataset?.page) {
    console.log("page btn clicked", buttonElem, buttonElem.dataset.page);
    const page =
      buttonElem.dataset.page && !isNaN(buttonElem.dataset.page)
        ? Number(buttonElem.dataset.page)
        : 1;

    fetchFilmDataFromPagination(page, pathName);
  }
};

async function fetchFilmDataFromPagination(page, pathName) {
  const currentUrlInfo = getUrlInfo();

  const newUrlParams = { ...currentUrlInfo, page, pathName };
  setUrlInfo(newUrlParams);

  // console.log(newUrlParams);
  handleLocation();
}
