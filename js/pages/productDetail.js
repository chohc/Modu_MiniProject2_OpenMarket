import "../common.js";
import { BASE_URL } from "../config.js";
import { initTabHandler } from "../utils/tabUtils.js";

const img = document.querySelector(".product__img");
const brand = document.querySelector(".product__brand");
const name = document.querySelector(".product__name");
const price = document.querySelector(".product__price .l-price");
const delivery = document.querySelector(".product__delivery");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const minusBtn = document.getElementById("minusBtn");
const count = document.getElementById("count");
const plusBtn = document.getElementById("plusBtn");

const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("id");

const deliveryMap = {
  PARCEL: "택배배송 / 무료배송",
};

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProductDetail(productID);
});

minusBtn.addEventListener("click", () => countBtnClick("-"));
plusBtn.addEventListener("click", () => countBtnClick("+"));

async function fetchProductDetail(productID) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productID}`);

    if (!response.ok) throw new Error("네트워크 오류");

    const data = await response.json();
    console.log(data);
    settingContent(data);
  } catch (error) {
    console.log("상품 디테일 불러오기 실패: ", error);
  }
}

function settingContent(data) {
  img.src = data.image;
  brand.textContent = data.seller.store_name;
  name.textContent = data.name;
  price.textContent = data.price.toLocaleString();
  delivery.textContent = deliveryMap[data.shipping_method];
  totalQuantity.textContent = count.value;
  totalPrice.textContent = data.price.toLocaleString();
}

function countBtnClick(operation) {
  console.log("dadf");
  let countValue = Number(count.value);
  if (operation === "-") {
    if (countValue > 1) countValue -= 1;
  } else {
    countValue += 1;
  }
  count.value = countValue;
  totalQuantity.textContent = countValue;
  totalPrice.textContent = (
    Number(price.textContent.replace(/,/g, "")) * countValue
  ).toLocaleString();
}

// tab button
initTabHandler(".product__tab-group");
