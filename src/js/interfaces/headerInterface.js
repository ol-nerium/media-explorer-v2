import { drawMarkupFromPageURL } from "../../main";

export function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt.target.closest("a");
  if (link) drawMarkupFromPageURL(link.href);
}
