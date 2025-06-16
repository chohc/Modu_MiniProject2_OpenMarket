import { createRouter } from "./router.js";
import { Header } from "./components/Header.js";

function App() {
  const header = document.getElementById("header");
  const main = document.getElementById("main-content");

  const init = () => {
    const headerContent = new Header();
    header.append(headerContent.element);

    const router = createRouter(main);
    router.init();

    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();

        const path = e.target.getAttribute("href");
        console.log("링크 클릭: ", path);

        router.navigateTo(path);
      }
    });
  };

  return { init };
}

App().init();
