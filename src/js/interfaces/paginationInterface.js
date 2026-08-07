export const paginationInterface = (evt) => {
  console.log(evt.target.nodeName);
  let buttonElem = null;
  if (evt.target.nodeName === "BUTTON") buttonElem = evt.target;
  if (evt.target?.closest("button")) buttonElem = evt.target.closest("button");

  if (buttonElem?.dataset?.control) {
    console.log("control btn clicked", buttonElem, buttonElem.dataset.control);
  }
  if (buttonElem?.dataset?.page) {
    console.log("page btn clicked", buttonElem, buttonElem.dataset.page);
  }
};
