import { ORDER, SORTBY } from "../../main";
import { handleLocation, navigate } from "../services/routing";
import { getUrlInfo, setUrlInfo } from "../services/urlInfoService";
import { infoToaster } from "./toaster";
import { loaderInterface } from "./loaderInterface";

export async function onSelectChange(evt) {
  const selectValue = evt.target.value;
  evt.target.value = "";

  const currentQuery = getUrlInfo();
  let newQuery = currentQuery;

  if (Object.values(SORTBY).includes(selectValue)) {
    newQuery = {
      ...newQuery,
      pathName: "genres",
      sortBy: selectValue,
      order: ORDER.DESC,
      page: 1,
    };

    infoToaster({
      message: `Sort by ${selectValue.split("_").join(" ")}`,
    });
  } else {
    newQuery = { ...newQuery, sortBy: null, order: null, pathName: "genres" };

    infoToaster({ message: `Sort by default (popularity)` });
  }

  navigate(newQuery);
  return loaderInterface(() => handleLocation());
}
