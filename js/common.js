import { Header } from "./components/Header.js";

function initializeCommonComponents() {
  if (!document.querySelector("header")) {
    const header = new Header(); // 알아서 사용자 타입 판단
    document.body.prepend(header.element);
  }
}

// 자동 실행
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCommonComponents);
} else {
  initializeCommonComponents();
}
