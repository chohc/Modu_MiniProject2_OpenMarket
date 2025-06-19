import { BASE_URL } from "../../../config.js";
import { signupState } from "../state/signupState.js";
import { domElements, domUtils } from "../utils/dom.js";
import { fieldValidators } from "../validators/fieldValidators.js";

export const pwHandler = {
  pwImg: null,
  pwCheckImg: null,

  handlePwBlur() {
    const pwValue = domElements.inputs.pw.value.trim();
    const validation = fieldValidators.pw(pwValue);

    signupState.validation.pw.isValid = validation.isValid;

    if (validation.isValid !== null && !validation.isValid) {
      domUtils.showMessage(
        domElements.inputs.pw,
        domElements.guides.pw,
        validation.message,
        "error"
      );
    } else {
      domUtils.clearMessage(domElements.inputs.pw, domElements.guides.pw);
    }

    this.pwImg.src = validation.isValid
      ? "./assets/images/icon-check-on.svg"
      : "./assets/images/icon-check-off.svg";
  },

  handlePwCheckInput() {
    const pwValue = domElements.inputs.pw.value.trim();
    const pwCheckValue = domElements.inputs.pwCheck.value.trim();
    const validation = fieldValidators.pwCheck(pwCheckValue, pwValue);

    signupState.validation.pwCheck.isValid = validation.isValid;

    if (validation.isValid !== null && !validation.isValid) {
      domUtils.showMessage(
        domElements.inputs.pwCheck,
        domElements.guides.pwCheck,
        validation.message,
        "error"
      );
    } else {
      domUtils.clearMessage(
        domElements.inputs.pwCheck,
        domElements.guides.pwCheck
      );
    }

    this.pwCheckImg.src = validation.isValid
      ? "./assets/images/icon-check-on.svg"
      : "./assets/images/icon-check-off.svg";
  },

  init() {
    this.pwImg = document.getElementById("pw-img");
    this.pwCheckImg = document.getElementById("pwCheck-img");

    domElements.inputs.pw.addEventListener(
      "blur",
      this.handlePwBlur.bind(this)
    );
    domElements.inputs.pwCheck.addEventListener(
      "input",
      this.handlePwCheckInput.bind(this)
    );
  },
};
