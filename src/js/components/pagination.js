const paginationButtonsList = (data) => {
  let page = Number(data.page);
  let total_pages = Number(data.total_pages);
  // total_pages are limited as 500 but backend has bug with big numbers, so fix:
  if (total_pages > 500) total_pages = 500;

  const mainBtnList = [];
  if (total_pages <= 7) {
    for (let i = 1; i <= total_pages; i += 1) mainBtnList.push(i);
    return mainBtnList;
  }
  if (page < 7) return [1, 2, 3, 4, 5, 6, 7, "...", total_pages];
  if (page >= 7 && page < total_pages - 5) {
    for (let i = page - 3; i < page + 3; i += 1) mainBtnList.push(i);
    return [1, "...", ...mainBtnList, "...", total_pages];
  }
  for (let i = total_pages - 6; i <= total_pages; i += 1) mainBtnList.push(i);
  return [1, "...", ...mainBtnList];
};
export const paginationSectionMarkup = (data) => {
  // const { page, total_pages, results, total_results } = data;

  const buttonsList = paginationButtonsList(data);
  if (buttonsList.length < 2) {
    // paginationRoot.innerHTML = "";
    return "";
  }

  let mainPagButtons = buttonsList
    .map((i) => {
      if (i === "...") {
        return `<div class="pageEllipsis">
          <svg class="icon dots-icon">
            <use xlink:href="./src/svgSprite.svg#main-dots"></use>
          </svg>
        </div>`;
      } else {
        return `<button class="pagBtn" data-page="${i}">
          ${i}
        </button>`;
      }
    })
    .join("");

  let arrowsMarkupObj = {
    rightArrow: `<button class="rightArrow" data-control="right" title="right-arrow">
            <svg class="icon right-arrow">
              <use xlink:href="./src/svgSprite.svg#main-right-arrow"></use>
            </svg>
          </button>`,
    leftArrow: `<button class="leftArrow" data-control="left" title="left-arrow">
            <svg class="icon left-arrow">
              <use xlink:href="./src/svgSprite.svg#main-left-arrow"></use>
            </svg>
          </button>`,
  };

  const resMarkup =
    arrowsMarkupObj.leftArrow + mainPagButtons + arrowsMarkupObj.rightArrow;

  return `<section class="pagination">
        <div class="container pagination-layout">
          <h2 class="sr-only">Pagination</h2>
          ${resMarkup}
          </div>
      </section>`;
};
