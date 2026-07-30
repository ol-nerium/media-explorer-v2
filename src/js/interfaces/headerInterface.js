import { drawFetchedGalleryPage, drawMarkupFromPageURL } from "../../main";

export function clickOnNavLink(evt) {
  evt.preventDefault();
  const link = evt.target.closest("a");
  if (link) drawMarkupFromPageURL(link.href);
}

export function onSearchFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.currentTarget);
  const searchQuery = formData.get("search-field");

  if (searchQuery.trim() === "") {
    alert(
      "here should be notification for not searching empty string or whatever",
    );
    return;
  }

  drawFetchedGalleryPage(1, searchQuery);

  // delay/check/empty value?
}
