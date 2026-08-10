import { SORTBY } from "../../main";
import { pathObject } from "../services/routing";
import { getUrlInfo } from "../services/urlInfoService";

export function onSelectChange(evt) {
  console.log(evt.target.value);
  const selectValue = evt.target.value;

  const currentQuery = getUrlInfo();
  let newQuery = currentQuery;
  if (Object.values(SORTBY).includes(selectValue)) {
    newQuery = { ...newQuery, sortBy: selectValue, pathName: "genres" };
  }

  console.log(newQuery);
}
