export const headerMarkup = () => {
  return `<header class="header">
      <div class="container mobile-header-layout">
        <button
          type="button"
          class="navBtn"
          title="open menu"
          data-control="openMobileMenu"
        >
          <svg class="icon">
            <use xlink:href="./src/svgSprite.svg#main-burger"></use>
          </svg>
        </button>
        <h1 class="poppins-semibold headerTitle">Home</h1>
        <button
          type="button"
          class="navBtn"
          title="toggle color theme"
          data-control="changeColorTheme"
        >
          <svg class="icon">
            <use xlink:href="./src/svgSprite.svg#main-moon"></use>
          </svg>
        </button>
      </div>

      <div class="header-menu-layout">
        <a href="/" title="logo" class="logo">
          <svg class="icon">
            <use xlink:href="./src/svgSprite.svg#Logo-icon"></use>
          </svg>
        </a>
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

        <h2 class="library-links_title">Your Library</h2>
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
      </div>

      <section class="main-heading">
        <h2 class="sr-only">Main page heading</h2>
        <div class="main-heading-layout container">
          <div class="searchbar">
            <form class="searchbar-form">
              <label for="search-field" class="search-field">
                <svg class="icon">
                  <use
                    xlink:href="./src/svgSprite.svg#main-magnify-glass-1"
                  ></use>
                </svg>
                <input id="search-field" placeholder="Search for movies..." />
              </label>
              <button
                type="submit"
                class="searchbar-button"
                title="search by query"
              >
                <svg class="icon">
                  <use
                    xlink:href="./src/svgSprite.svg#main-magnify-glass-2"
                  ></use>
                </svg>
              </button>
            </form>
          </div>

          <div class="main-heading-buttons">
            <button
              type="button"
              title="themeBtn"
              data-control="changeColorTheme"
            >
              <svg class="icon">
                <use xlink:href="./src/svgSprite.svg#main-moon"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </header>`;
};
