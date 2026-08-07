import { clickOnNavLink } from "./headerInterface";

export function mainPageInfoInterface(evt) {
  console.log(evt.target);
  // need preventDefault?
  clickOnNavLink(evt);
}
