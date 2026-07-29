import { drawMarkupFromPageName } from "../../main";

export function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt.target.closest("a");
  if (link) drawMarkupFromPageName(link.href);
}
