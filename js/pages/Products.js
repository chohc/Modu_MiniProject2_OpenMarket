import { Card } from "../components/Card.js";
import { BASE_URL } from "../config.js";

export default function Products() {
  async function fetchProducts() {
    try {
      const response = await fetch(`${BASE_URL}/products/`);

      if (!response.ok) throw new Error("네트워크 오류");

      const data = await response.json();
      console.log(data.results);

      return data.results;
    } catch (error) {
      console.error("상품 목록 불러오기 실패:", error);
    }
  }

  const render = async () => {
    // banner
    const bannerSection = document.createElement("section");
    bannerSection.className = "main-banner__container";
    bannerSection.innerHTML = `
        <h2 class="sr-only">배너</h2>
        <!-- <img src="" alt="" class="main-banner__img"> -->
        <button class="main-banner__btn">
          <img src="../assets/images/icon-swiper-1.svg" alt="왼족 배너 보기" />
        </button>
        <button class="main-banner__btn">
          <img src="../assets/images/icon-swiper-2.svg" alt="오른쪽 배너 보기" />
        </button>
        <div class="pagination">
          <div class="pagination-dot active"></div>
          <div class="pagination-dot"></div>
          <div class="pagination-dot"></div>
          <div class="pagination-dot"></div>
          <div class="pagination-dot"></div>
        </div>
    `;

    // products
    const productSection = document.createElement("section");
    productSection.className = "product-list";
    productSection.innerHTML = `<h2 class="sr-only">상품 목록</h2>`;

    const products = await fetchProducts();
    products.forEach((product) => {
      const card = new Card({
        id: product.id,
        imgURL: product.image,
        name: product.info,
        manufacturer: product.name,
        price: product.price,
      });

      productSection.prepend(card.element);
    });

    // fragment
    const fragment = document.createDocumentFragment();

    const title = document.createElement("h1");
    title.className = "sr-only";
    title.textContent = "오픈마켓";

    fragment.append(title, bannerSection, productSection);

    return fragment;
  };

  return { render };
}
