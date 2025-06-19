import { domElements } from "../utils/dom.js";

export const phoneHandler = {
  handlePhoneDropdown(e) {
    e.stopPropagation();
    domElements.modal.dropdown.style.display =
      domElements.modal.dropdown.style.display === "block" ? "none" : "block";
  },

  handlePhoneSelect(e) {
    e.stopPropagation();
    if (e.target.tagName === "P") {
      domElements.inputs.phone1.textContent = e.target.textContent;
      domElements.modal.dropdown.style.display = "none";
    }
  },

  handleModalClose(e) {
    if (
      !domElements.modal.dropdown.contains(e.target) &&
      !domElements.modal.openBtn.contains(e.target)
    ) {
      domElements.modal.dropdown.style.display = "none";
    }
  },

  init() {
    domElements.modal.openBtn.addEventListener(
      "click",
      this.handlePhoneDropdown.bind(this)
    );
    domElements.modal.dropdown.addEventListener(
      "click",
      this.handlePhoneSelect.bind(this)
    );
    document.body.addEventListener("click", this.handleModalClose.bind(this));
  },
};
