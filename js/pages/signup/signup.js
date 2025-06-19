import { tabHandler } from "./handlers/tabHandler.js";
import { inputHandler } from "./handlers/inputHandler.js";
import { idHandler } from "./handlers/idHandler.js";
import { phoneHandler } from "./handlers/phoneHandler.js";
import { signupState } from "./state/signupState.js";
import { domElements, domUtils } from "./utils/dom.js";
import { fieldValidators } from "./validators/fieldValidators.js";
import { validationUtils } from "./utils/validation.js";

// 나머지 필드 핸들러들
const fieldHandlers = {
  // 비밀번호 핸들러
  handlePwBlur() {
    const value = domElements.inputs.pw.value.trim();
    const validation = fieldValidators.pw(value);

    signupState.validation.pw.isValid = validation.isValid;

    if (!validation.isValid) {
      domUtils.showMessage(
        domElements.inputs.pw,
        domElements.guides.pw,
        validation.message,
        "error"
      );
    } else {
      domUtils.clearMessage(domElements.inputs.pw, domElements.guides.pw);
      validationUtils.updateCurrentStep("pw-check");
    }
  },

  // 비밀번호 재확인 핸들러
  handlePwCheckBlur() {
    const value = domElements.inputs.pwCheck.value.trim();
    const pwValue = domElements.inputs.pw.value.trim();
    const validation = fieldValidators.pwCheck(value, pwValue);

    signupState.validation.pwCheck.isValid = validation.isValid;

    if (!validation.isValid) {
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
      validationUtils.updateCurrentStep("name");
    }
  },

  // 이름 핸들러
  handleNameBlur() {
    const value = domElements.inputs.name.value.trim();
    const validation = fieldValidators.name(value);

    signupState.validation.name.isValid = validation.isValid;

    if (!validation.isValid) {
      domUtils.showMessage(
        domElements.inputs.name,
        domElements.guides.name,
        validation.message,
        "error"
      );
    } else {
      domUtils.clearMessage(domElements.inputs.name, domElements.guides.name);
      validationUtils.updateCurrentStep("phone2");
    }
  },

  // 휴대폰 핸들러
  handlePhoneBlur() {
    const phone2 = domElements.inputs.phone2.value.trim();
    const phone3 = domElements.inputs.phone3.value.trim();
    const validation = fieldValidators.phone(phone2, phone3);

    signupState.validation.phone.isValid = validation.isValid;

    if (!validation.isValid && (phone2 || phone3)) {
      // 둘 중 하나라도 입력했을 때만 검사
      domUtils.showMessage(
        domElements.inputs.phone2,
        domElements.guides.phone,
        validation.message,
        "error"
      );
    } else if (validation.isValid) {
      domUtils.clearMessage(
        domElements.inputs.phone2,
        domElements.guides.phone
      );
      validationUtils.updateCurrentStep("phone3");
    }
  },
};

// 이벤트 리스너 초기화
function initFieldValidation() {
  // 비밀번호 관련
  domElements.inputs.pw.addEventListener("blur", fieldHandlers.handlePwBlur);
  domElements.inputs.pwCheck.addEventListener(
    "blur",
    fieldHandlers.handlePwCheckBlur
  );

  // 이름
  domElements.inputs.name.addEventListener(
    "blur",
    fieldHandlers.handleNameBlur
  );

  // 휴대폰
  domElements.inputs.phone2.addEventListener(
    "blur",
    fieldHandlers.handlePhoneBlur
  );
  domElements.inputs.phone3.addEventListener(
    "blur",
    fieldHandlers.handlePhoneBlur
  );
}

// 메인 초기화 함수
function init() {
  console.log("회원가입 페이지 초기화");

  // 각 핸들러 초기화
  tabHandler.init();
  inputHandler.init();
  idHandler.init();
  phoneHandler.init();
  initFieldValidation();

  console.log("초기 상태:", signupState);
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", init);
