import { pathObject } from "../routingMarkup";

export const mainPageInfoSectionMarkup = (additionalTitle = null) => {
  const navLinksArr = [{ name: "Home", link: "/" }];
  const currentPathName = window.location.pathname;
  const pathName = currentPathName === "/" ? "home" : currentPathName.slice(1);
  if (pathName !== "home" && pathObject[pathName]) {
    console.log({ pathName, link: pathObject[pathName].path });
    navLinksArr.push({ name: pathName, link: pathObject[pathName].path });
  }
  if (!!additionalTitle)
    navLinksArr.push({ name: additionalTitle, link: window.location.href });

  return `<section class="main-page-info">
        <div class="container main-page-info-layout">
          <ul class="nav-list">
          ${navLinksArr
            .map(
              (i) =>
                `<li class="nav-list_item">
              <a href="${i.link}">${i.name}</a>
            </li>`,
            )
            .join("")}
          </ul>
          <h2 class="main-page-info-title">${additionalTitle ? additionalTitle : "DefaultValue"}</h2>
        </div>
      </section>`;
};
