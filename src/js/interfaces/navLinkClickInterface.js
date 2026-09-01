import { handleLocation } from "../services/routing";
import { runExclusiveUiAction } from "../interfaces";

export async function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt?.target?.closest("a");
  if (link) {
    await runExclusiveUiAction(() => handleLocation(link.href));
    return link;
  }
}
