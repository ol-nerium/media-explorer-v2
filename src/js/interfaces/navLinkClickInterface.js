import { handleLocation } from "../services/routing";

export function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt?.target?.closest("a");
  if (link) {
    handleLocation(link.href);
    return link;
  }
}
