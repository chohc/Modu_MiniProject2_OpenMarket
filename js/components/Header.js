export class Header {
  constructor(path) {
    this.element = document.createElement("header");
    this.render(path);
  }

  render(path) {
    if (path === "./login" || path === "/signup") {
      this.element.innerHTML = "";
    } else {
      this.element.innerHTML = `
        <div class="header-content">
            <div class="header-left-content">
            <h1 class="logo">
                <a href="#"
                ><img src="./assets/images/Logo-hodu.svg" alt="Hodu"
                /></a>
            </h1>
            <form action="get" class="search-form">
                <label for="search-input" class="sr-only">상품 검색</label>
                <input
                type="text"
                name="search-input"
                id="search-input"
                placeholder="상품을 검색해보세요!"
                />
                <button type="submit" id="search-btn">
                <img src="./assets/images/search.svg" alt="검색하기" />
                </button>
            </form>
            </div>

            <nav>
            <ul class="nav-menu">
                <li>
                <a href="/cart" data-link  class="nav-item">
                    <img
                    src="./assets/images/icon-shopping-cart.svg"
                    alt=""
                    class="nav-icon"
                    />
                    <span>장바구니</span>
                </a>
                </li>

                <li>
                <a href="/login" data-link class="nav-item">
                    <img
                    src="./assets/images/icon-user.svg"
                    alt=""
                    class="nav-icon"
                    />
                    <span>로그인</span>
                </a>
                </li>
            </ul>
            </nav>
        </div>
        `;
    }
  }
}
