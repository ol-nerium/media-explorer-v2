const tabletHomeSectionGallery = (title = "") => {
  return `<section class="saved-gallery">
        <div class="container">
          <h2 class="saved-gallery_title">${title}</h2>
          <ul class="saved-gallery-list">
            <li class="saved-gallery-list_item">
              
              <div class="img-wrap">
                <img src="./src/blank-picture.png" alt="pic" />
                <a href="" title="item-link" class="item-link"></a>
              </div>
              <div class="raiting">
                <div class="raiting-value">
                  <svg class="icon star-icon">
                    <use xlink:href="./src/svgSprite.svg#main-star"></use>
                  </svg>
                  <span>8.6</span>
                </div>
                <div class="imdbIcon">
                  <svg class="icon">
                    <use xlink:href="./src/svgSprite.svg#main-imdb"></use>
                  </svg>
                </div>
              </div>
              <div class="saved-gallery-list_item-desc">
                <h3 class="title">Film name</h3>
                <p class="year">year</p>
                <ul class="gallery-list_item-genres">
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                  <li class="gallery-list_item-genres_item">genre</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </section>`;
};
export const tabletHomeSectionMarkup = () => {
  // return `<section class="tablet-home-section">${mainPageInfoSectionMarkup() + sortingSectionMarkup() + tabletHomeSectionGallery("Tranding")}</section>`;
  return `<section class="tablet-home-section">nothing at the time</section>`;
};
