import { inputHandler } from "./handlers/inputHandler.js";
import { idHandler } from "./handlers/idHandler.js";
import { phoneHandler } from "./handlers/phoneHandler.js";
import { signupState } from "./state/signupState.js";
import { pwHandler } from "./handlers/pwHandler.js";
import { initTabHandler } from "../../utils/tabUtils.js";
import { initModalHandler } from "../../utils/modalUtils.js";

function init() {
  console.log("회원가입 페이지 초기화");

  inputHandler.init();
  idHandler.init();
  pwHandler.init();
  phoneHandler.init();
  initTabHandler(".tab-group", toggleSellerMode);
  initModalHandler(".select-btn", ".num-dropdown", selectPhone1);

  console.log("초기 상태:", signupState);
}

function toggleSellerMode(target) {
  const isSellerMode = target.textContent.trim() === "판매회원가입";
  const sellerFields = document.querySelector(".seller-fields");

  if (sellerFields) {
    sellerFields.style.display = isSellerMode ? "block" : "none";
    sellerFields.setAttribute("aria-hidden", !isSellerMode);
  }
}

function selectPhone1(target) {
  if (target.tagName === "P") {
    const phone1 = document.getElementById("phone1");

    phone1.textContent = target.textContent;
  }
}

document.addEventListener("DOMContentLoaded", init);
