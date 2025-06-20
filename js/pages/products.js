import "../common.js";
import { Card } from "../components/Card.js";
import { BASE_URL } from "../config.js";

const productSection = document.querySelector(".product-list");

function init() {
  if (!productSection) {
    console.error("상품 목록 섹션을 찾을 수 없습니다.");
    return;
  }

  displayProducts();
}

async function displayProducts() {
  try {
    productSection.innerHTML = "<div>상품을 불러오는 중...</div>";

    const products = await fetchProducts();
    if (products && products.length > 0) {
      productSection.innerHTML = "";
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
    } else {
      productSection.innerHTML = "<div>상품이 없습니다.</div>";
    }
  } catch (error) {
    productSection.innerHTML = "<div>상품을 불러오는데 실패했습니다.</div>";
  }
}

async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products/`);

    if (!response.ok) throw new Error(response.status);

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("상품 목록 불러오기 실패:", error);
  }
}

document.addEventListener("DOMContentLoaded", init);
