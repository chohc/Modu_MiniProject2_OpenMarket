import { signupState } from "../state/signupState.js";
import { domElements, domUtils } from "../utils/dom.js";
import { fieldValidators } from "../validators/fieldValidators.js";

export const phoneHandler = {
  phoneGroup: document.body.querySelector(".phone-group"),

  // modal
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

  // input
  handlePhoneBlur() {
    const phone2 = domElements.inputs.phone2.value.trim();
    const phone3 = domElements.inputs.phone3.value.trim();
    const validation = fieldValidators.phone(phone2, phone3);

    signupState.validation.phone.isValid = validation.isValid;

    if (!validation.value) {
      console.log("ADfs");
      domElements.guides.phone.textContent = validation.message;
    } else {
      domElements.guides.phone.textContent = "";
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

    this.phoneGroup.addEventListener("blur", this.handlePhoneBlur.bind(this));
  },
};
