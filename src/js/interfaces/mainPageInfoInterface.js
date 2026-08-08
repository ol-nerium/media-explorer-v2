import { clickOnNavLink } from "./navLinkClickInterface";

export function mainPageInfoInterface(evt) {
  console.log(evt.target);
  // need preventDefault?
  clickOnNavLink(evt);
}
