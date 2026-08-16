import { handleLocation } from "../services/routing";
import { hideLoader, showLoader } from "../interfaces";

export function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt?.target?.closest("a");
  if (link) {
    showLoader();
    handleLocation(link.href);
    hideLoader();
    return link;
  }
}
