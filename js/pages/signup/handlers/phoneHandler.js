import { signupState } from "../state/signupState.js";
import { domElements, domUtils } from "../utils/dom.js";
import { fieldValidators } from "../validators/fieldValidators.js";

export const phoneHandler = {
  phoneGroup: document.body.querySelector(".phone-group"),

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
    this.phoneGroup.addEventListener("blur", this.handlePhoneBlur.bind(this));
  },
};
