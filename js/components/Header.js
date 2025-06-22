import { ResponsiveUtils } from "../utils/responsiveUtils.js";

const NAV_ITEMS = {
  BUYER: [
    {
      id: "cartBtn",
      href: "#",
      icon: "./assets/images/icon-shopping-cart.svg",
      iconHover: "./assets/images/icon-shopping-cart-2.svg",
      text: "장바구니",
      className: "nav-item",
    },
    {
      id: "loginBtn",
      href: "#",
      icon: "./assets/images/icon-user.svg",
      iconHover: "./assets/images/icon-user-2.svg",
      text: "마이페이지",
      className: "nav-item",
    },
  ],
  SELLER: [
    {
      id: "loginBtn",
      href: "#",
      icon: "./assets/images/icon-user.svg",
      iconHover: "./assets/images/icon-user-2.svg",
      text: "마이페이지",
      className: "nav-item",
    },
    {
      id: "sellerCenterBtn",
      href: "#",
      icon: "./assets/images/icon-shopping-bag.svg",
      iconHover: "./assets/images/icon-shopping-bag.svg",
      text: "판매자 센터",
      className: "ms-icon-button",
    },
  ],
  NONMEMBER: [
    {
      id: "cartBtn",
      href: "#",
      icon: "./assets/images/icon-shopping-cart.svg",
      iconHover: "./assets/images/icon-shopping-cart-2.svg",
      text: "장바구니",
      className: "nav-item",
    },
    {
      id: "loginBtn",
      href: "../../login.html",
      icon: "./assets/images/icon-user.svg",
      iconHover: "./assets/images/icon-user-2.svg",
      text: "로그인",
      className: "nav-item",
    },
  ],
};

// SearchComponent => 검색창
// NavigationComponent => 사용자에 따라 다른 메뉴
// Header => 헤더(컴포넌트 조합)

class SearchComponent {
  constructor(container) {
    this.container = container;
    // this.isMobile = ResponsiveUtils.isMobile();
    this.isMobile = false;
    this.render();
    this.setupEventListeners();
  }

  render() {
    const searchHTML = this.isMobile
      ? this.renderMobileSearch()
      : this.renderDesktopSearch();
    this.container.innerHTML = searchHTML;
  }

  renderDesktopSearch() {
    return `
      <form class="search-form" role="search">
        <label for="search-input" class="sr-only">상품 검색</label>
        <input
          type="text"
          name="search-input"
          id="search-input"
          class="search-input"
          placeholder="상품을 검색해보세요!"
          autocomplete="off"
        />
        <button type="submit" id="search-btn" class="search-btn" aria-label="검색하기">
          <img src="./assets/images/search.svg" alt="" />
        </button>
      </form>
    `;
  }

  renderMobileSearch() {
    return `
      추후 구현
    `;
  }

  setupEventListeners() {
    if (this.isMobile) {
      this.setupMobileListeners();
    } else {
      this.setupDesktopListeners();
    }
  }

  setupDesktopListeners() {
    const form = this.container.querySelector(".search-form");
    const input = this.container.querySelector("#search-input");

    form?.addEventListener("submit", (e) => this.handleSearch(e, input));
  }

  setupMobileListeners() {
    // 추후 구현
  }

  handleSearch(e, input) {
    e.preventDefault();
    const query = input?.value.trim();
    if (query) {
      console.log("검색어:", query);
      // 실제 검색 로직 구현
    }
  }

  updateResponsive() {
    // const newIsMobile = ResponsiveUtils.isMobile();
    // if (this.isMobile !== newIsMobile) {
    //   this.isMobile = newIsMobile;
    //   this.isExpanded = false;
    //   this.render();
    //   this.setupEventListeners();
    // }
  }
}

class NavigationComponent {
  constructor(container, userType) {
    this.container = container;
    this.userType = userType;
    this.render();
    this.setupEventListeners();
  }

  render() {
    const items = NAV_ITEMS[this.userType] || [];
    const navHTML = `
        <ul class="nav-menu">
          ${items.map((item) => this.renderNavItem(item)).join("")}
        </ul>
    `;
    this.container.innerHTML = navHTML;
  }

  renderNavItem(item) {
    return `
      <li>
        <a href="${item.href}" id="${item.id}" class="${item.className}">
          <img
            src="${item.icon}"
            alt=""
            class="nav-icon"
            data-hover-src="${item.iconHover}"
          />
          <span class="nav-text">${item.text}</span>
        </a>
      </li>
    `;
  }

  setupEventListeners() {
    const navItems = this.container.querySelectorAll(
      ".nav-item, .ms-icon-button"
    );

    navItems.forEach((item) => {
      const img = item.querySelector(".nav-icon");
      const originalSrc = img?.src;
      const hoverSrc = img?.dataset.hoverSrc;

      if (img && hoverSrc) {
        item.addEventListener("mouseenter", () => {
          img.src = hoverSrc;
          item.style.color = "#21BF48";
        });

        item.addEventListener("mouseleave", () => {
          img.src = originalSrc;
          item.style.color = "#767676";
        });
      }
    });
  }
}

export class Header {
  constructor() {
    this.element = document.createElement("header");
    this.userType = this.getUserType();
    this.searchComponent = null;
    this.navigationComponent = null;

    this.render();
    this.setupComponents();
    // this.setupResponsive();
  }

  getUserType() {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user_info"));

      if (userInfo) {
        return userInfo.user_type;
      } else {
        return "NONMEMBER";
      }
    } catch (error) {
      console.warn("사용자 정보 파싱 오류:", error);
      return "NONMEMBER";
    }
  }

  render() {
    this.element.innerHTML = `
      <div class="header-content">
        <div class="header-left">
          <h1 class="logo">
            <a href="./" aria-label="오픈마켓 호두">
              <img src="./assets/images/Logo-hodu.svg" alt="" />
            </a>
          </h1>
          <div class="search-container"></div>
        </div>
         <nav class="main-nav" role="navigation">
         </nav>
      </div>
    `;
  }

  setupComponents() {
    const searchContainer = this.element.querySelector(".search-container");
    const mainNav = this.element.querySelector(".main-nav");

    this.searchComponent = new SearchComponent(searchContainer);
    this.navigationComponent = new NavigationComponent(mainNav, this.userType);
  }

  getSearchComponent() {
    return this.searchComponent;
  }

  getNavigationComponent() {
    return this.navigationComponent;
  }
}
