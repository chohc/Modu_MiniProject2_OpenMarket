import { tabHandler } from "./handlers/tabHandler.js";
import { inputHandler } from "./handlers/inputHandler.js";
import { idHandler } from "./handlers/idHandler.js";
import { phoneHandler } from "./handlers/phoneHandler.js";
import { signupState } from "./state/signupState.js";

// 메인 초기화 함수
function init() {
  console.log("회원가입 페이지 초기화");

  // 각 핸들러 초기화
  tabHandler.init();
  inputHandler.init();
  idHandler.init();
  phoneHandler.init();

  console.log("초기 상태:", signupState);
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", init);
