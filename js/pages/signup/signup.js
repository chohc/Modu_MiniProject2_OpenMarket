// import { tabHandler } from "./handlers/tabHandler.js";
import { inputHandler } from "./handlers/inputHandler.js";
import { idHandler } from "./handlers/idHandler.js";
import { phoneHandler } from "./handlers/phoneHandler.js";
import { signupState } from "./state/signupState.js";
import { pwHandler } from "./handlers/pwHandler.js";
import { initTabHandler } from "../../utils/tabUtils.js";

// 메인 초기화 함수
function init() {
  console.log("회원가입 페이지 초기화");

  // 각 핸들러 초기화
  inputHandler.init();
  idHandler.init();
  pwHandler.init();
  phoneHandler.init();
  initTabHandler(".tab-group", toggleSellerMode);

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

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", init);
