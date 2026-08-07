import { clickOnNavLink } from "./headerInterface";
import { closeModal } from "./modalInterface";

export function fullCardNavInterface(evt) {
  console.log(evt.target);

  const linkIsClicked = !!clickOnNavLink(evt);

  let backBtn = null;
  console.log(evt.target);
  if (evt.target.nodeName === "BUTTON") backBtn = evt.target;
  if (evt.target?.closest("button")) backBtn = evt.target.closest("button");

  if (backBtn?.classList?.contains("back-btn") || linkIsClicked) closeModal();

  //   console.log("click on backBtn");
}
