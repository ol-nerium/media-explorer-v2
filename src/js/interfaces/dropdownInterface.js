import { ORDER, SORTBY } from "../../main";
import { handleLocation } from "../services/routing";
import { getUrlInfo, setUrlInfo } from "../services/urlInfoService";
import { infoToaster, runExclusiveUiAction } from "../interfaces";

export async function onSelectChange(evt) {
  const selectValue = evt.target.value;
  evt.target.value = "";

  const currentQuery = getUrlInfo();
  let newQuery = currentQuery;

  if (Object.values(SORTBY).includes(selectValue)) {
    newQuery = {
      ...newQuery,
      sortBy: selectValue,
      order: ORDER.DESC,
      pathName: "genres",
    };

    setUrlInfo(newQuery);
    infoToaster({
      message: `Sort by ${selectValue.split("_").join(" ")}`,
    });
    await runExclusiveUiAction(() => handleLocation());
  } else {
    newQuery = { ...newQuery, sortBy: null, order: null, pathName: "genres" };
    setUrlInfo(newQuery);

    infoToaster({ message: `Sort by default (popularity)` });
    await runExclusiveUiAction(() => handleLocation());
  }
}
