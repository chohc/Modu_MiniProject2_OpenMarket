import "../common.js";
import { Amount } from "../components/Amount.js";
import { BASE_URL } from "../config.js";
import { initTabHandler } from "../utils/tabUtils.js";

const elements = {
  img: document.querySelector(".product__img"),
  brand: document.querySelector(".product__brand"),
  name: document.querySelector(".product__name"),
  price: document.querySelector(".product__price .l-price"),
  delivery: document.querySelector(".product__delivery"),
  totalQuantity: document.getElementById("totalQuantity"),
  totalPrice: document.getElementById("totalPrice"),
  minusBtn: document.getElementById("minusBtn"),
  count: document.getElementById("count"),
  plusBtn: document.getElementById("plusBtn"),
};

const DELIVERY_MAP = {
  PARCEL: "택배배송 / 무료배송",
};

const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("id");

function init() {
  if (!productID) {
    console.error("상품 ID가 없습니다.");
    return;
  }

  initTabHandler(".product__tab-group");
  fetchProductDetail(productID);
  createAmountBtn();
}

async function fetchProductDetail(productID) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productID}`);

    if (!response.ok) throw new Error("네트워크 오류");

    const data = await response.json();
    displayProductInfo(data);
  } catch (error) {
    console.log("상품 디테일 불러오기 실패: ", error);
  }
}

function displayProductInfo(data) {
  elements.img.src = data.image;
  elements.brand.textContent = data.seller.store_name;
  elements.name.textContent = data.name;
  elements.price.textContent = data.price.toLocaleString();
  elements.delivery.textContent = DELIVERY_MAP[data.shipping_method];
  elements.totalQuantity.textContent = elements.count.value;
  elements.totalPrice.textContent = data.price.toLocaleString();
}

function createAmountBtn() {
  new Amount({
    initialValue: 1,
    min: 1,
    max: 99,
    containerSelector: ".product__count-container",
    onChange: (value) => {
      elements.totalQuantity.textContent = value;
      elements.totalPrice.textContent = (
        Number(elements.price.textContent.replace(/,/g, "")) * value
      ).toLocaleString();
    },
  });
}

document.addEventListener("DOMContentLoaded", init);
