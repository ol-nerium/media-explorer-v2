import { ORDER, SORTBY } from "../../main";
import { handleLocation, pathObject } from "../services/routing";
import { getUrlInfo, setUrlInfo } from "../services/urlInfoService";
import { hideLoader, showLoader } from "./notificationInterface";

export function onSelectChange(evt) {
  const selectValue = evt.target.value;
  evt.target.value = "";

  const currentQuery = getUrlInfo();
  let newQuery = currentQuery;
  showLoader();

  if (Object.values(SORTBY).includes(selectValue)) {
    newQuery = {
      ...newQuery,
      sortBy: selectValue,
      order: ORDER.DESC,
      pathName: "genres",
    };

    setUrlInfo(newQuery);
    showLoader();
    handleLocation();
    hideLoader();
    // evt.target.value = selectValue;
  } else {
    newQuery = { ...newQuery, sortBy: null, order: null, pathName: "genres" };
    setUrlInfo(newQuery);

    showLoader();
    handleLocation();
    hideLoader();
  }

  hideLoader();
}
