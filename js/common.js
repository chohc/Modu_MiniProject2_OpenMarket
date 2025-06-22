import { Footer } from "./components/Footer.js";
import { Header } from "./components/Header.js";

function initializeCommonComponents() {
  if (!document.querySelector("header")) {
    const header = new Header();
    document.body.prepend(header.element);
  }
  if (!document.querySelector("footer")) {
    const footer = new Footer();
    document.body.append(footer.element);
  }
}

// 자동 실행
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCommonComponents);
} else {
  initializeCommonComponents();
}
