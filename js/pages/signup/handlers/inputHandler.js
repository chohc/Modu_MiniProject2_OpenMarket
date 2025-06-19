import { signupState } from "../state/signupState.js";
import { domElements, domUtils } from "../utils/dom.js";
import { validationUtils } from "../utils/validation.js";

export const inputHandler = {
  handleInputFocus(e) {
    const inputId = e.target.id;

    if (!validationUtils.isInputOrderValid(inputId)) {
      e.target.blur();
      this.showOrderWarning(inputId);
      return false;
    }
    return true;
  },

  showOrderWarning(targetInputId) {
    const targetIndex = validationUtils.getCurrentStepIndex(targetInputId);

    for (let i = 0; i < targetIndex; i++) {
      const inputId = signupState.inputOrder[i];
      const input = domElements.inputs[inputId];
      const guideElement = domUtils.getGuideElement(inputId);

      if (input && guideElement && !this.isStepCompleted(i)) {
        // fail class는 추가하지 않고 메시지만 표시
        guideElement.style.color = "#EB5757";
        guideElement.textContent = "필수 정보입니다.";
      }
    }
  },

  // 각 단계가 완료되었는지 확인하는 헬퍼 메서드
  isStepCompleted(stepIndex) {
    const inputId = signupState.inputOrder[stepIndex];

    switch (inputId) {
      case "id":
        return (
          signupState.validation.id.isValid &&
          signupState.validation.id.isChecked
        );
      case "pw":
        return signupState.validation.pw.isValid;
      case "pw-check":
        return signupState.validation.pwCheck.isValid;
      case "name":
        return signupState.validation.name.isValid;
      case "phone2":
      case "phone3":
        return signupState.validation.phone.isValid;
      default:
        return false;
    }
  },

  init() {
    // 입력 순서 검사가 필요한 필드들
    const inputsToCheck = [
      domElements.inputs.pw,
      domElements.inputs.pwCheck,
      domElements.inputs.name,
      domElements.inputs.phone2,
      domElements.inputs.phone3,
      domElements.inputs.businessNumber,
      domElements.inputs.storeName,
    ];

    inputsToCheck.forEach((input) => {
      if (input) {
        input.addEventListener("focus", this.handleInputFocus.bind(this));
      }
    });
  },
};
