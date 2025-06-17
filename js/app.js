import { createRouter } from "./router.js";
import { Header } from "./components/Header.js";

function App() {
  const main = document.getElementById("main-content");

  const init = () => {
    const header = new Header();
    document.body.prepend(header.element);

    const router = createRouter(main);
    router.init();

    document.addEventListener("click", (e) => {
      console.log(e.target);
      if (e.target.matches("[data-link]") || e.target.closest("[data-link]")) {
        e.preventDefault();
        const path = e.target.closest("[data-link]").getAttribute("href");
        console.log("링크 클릭: ", path);

        router.navigateTo(path);
      }
    });
  };

  return { init };
}

App().init();
