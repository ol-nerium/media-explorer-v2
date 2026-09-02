import { handleLocation } from "../services/routing";
import { loaderInterface } from "./loaderInterface";

export async function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt?.target?.closest("a");
  if (link) {
    await loaderInterface(() => handleLocation(link.href));

    return link;
  }
}
