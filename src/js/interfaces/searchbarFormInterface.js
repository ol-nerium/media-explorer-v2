import { openFetchedGalleryPage } from "../services/routing";

export const searchbarFormInterface = (evt) => {
  console.log(evt);
};

export function onSearchFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.currentTarget);
  const searchQuery = formData.get("search-field");

  if (searchQuery.trim() === "") {
    alert(
      "here should be notification for not searching empty string or whatever",
    );
    // TODO
    return;
  }

  openFetchedGalleryPage(1, searchQuery);

  // delay/check/empty value?
}
