import { signupState } from "../state/signupState.js";
import { domElements } from "../utils/dom.js";

export const tabHandler = {
  handleTabClick(e) {
    if (e.target.tagName === "BUTTON") {
      const activeBtn = domElements.tabGroup.querySelector(".tab-btn.active");
      if (activeBtn) activeBtn.classList.remove("active");
      e.target.classList.add("active");
      signupState.memberPosition = e.target.textContent;

      // 판매자 선택 시 추가 필드 표시
      this.toggleSellerFields(e.target.textContent.trim() === "판매회원가입");
    }
  },

  toggleSellerFields(isSellerMode) {
    const sellerFields = document.querySelector(".seller-fields");
    if (sellerFields) {
      sellerFields.style.display = isSellerMode ? "block" : "none";
      sellerFields.setAttribute("aria-hidden", !isSellerMode);
    }
  },

  init() {
    domElements.tabGroup.addEventListener(
      "click",
      this.handleTabClick.bind(this)
    );
  },
};
