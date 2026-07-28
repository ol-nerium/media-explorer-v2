export const mobileModalMenuMarkup = () => {
  return `<div class="mobile-modal-menu isOpen">
        <button class="modal-closeBtn">
          <svg class="icon close-icon">
            <use xlink:href="./src/svgSprite.svg#main-cross-1"></use>
          </svg>
        </button>
        <ul class="main-links-list">
          <li class="main-links-list_item">
            <a href="/">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-home"></use>
              </svg>
              Home
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/movies">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-films"></use>
              </svg>
              Movies
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/genres">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-saved"></use>
              </svg>
              Genres
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/watchlist">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>
              Watchlist
            </a>
          </li>

          <li class="main-links-list_item">
            <a href="/history">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-history"></use>
              </svg>
              History
            </a>
          </li>
        </ul>

        <h2 class="mobile-modal-menu-title">Your Library</h2>
        <ul class="library-links-list">
          <li class="library-links-list_item">
            <a href="/favorites">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-heart"></use>
              </svg>
              Favorites
            </a>
          </li>

          <li class="library-links-list_item">
            <a href="/queue">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-queue"></use>
              </svg>
              In Queque
            </a>
          </li>
        </ul>

        <ul class="settings-links-list">
          <li class="settings-links-list_item">
            <a href="/settings">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-settings"></use>
              </svg>
              Settings
            </a>
          </li>

          <li class="settings-links-list_item">
            <a href="/logout">
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-logout"></use>
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </div>`;
};
