import { BASE_URL } from "../../../config.js";
import { signupState } from "../state/signupState.js";
import { domElements, domUtils } from "../utils/dom.js";
import { fieldValidators } from "../validators/fieldValidators.js";
import { validationUtils } from "../utils/validation.js";

export const idHandler = {
  handleIdBlur() {
    const value = domElements.inputs.id.value.trim();
    const validation = fieldValidators.id(value);

    signupState.validation.id.isValid = validation.isValid;

    if (validation.isValid !== null && !validation.isValid) {
      domUtils.showMessage(
        domElements.inputs.id,
        domElements.guides.id,
        validation.message,
        "error"
      );
      signupState.validation.id.isValid = false;
    } else if (
      validation.isValid &&
      validation.message &&
      signupState.validation.id.isChecked
    ) {
      // 중복검사도 완료했지만 input을 다시 한번 눌렀다 다른데 간 경우
      domUtils.showMessage(
        domElements.inputs.id,
        domElements.guides.id,
        validation.message,
        "success"
      );
      signupState.validation.id.isValid = true;
    } else if (validation.isValid && validation.message) {
      // 아이디 중복 검사 미실시
      domUtils.showMessage(
        domElements.inputs.id,
        domElements.guides.id,
        validation.message,
        "error"
      );
      signupState.validation.id.isValid = true;
    } else {
      domUtils.clearMessage(domElements.inputs.id, domElements.guides.id);
      signupState.validation.id.isValid = true;
    }
  },

  async handleIdCheck(e) {
    e.preventDefault();

    const value = domElements.inputs.id.value.trim();
    const validation = fieldValidators.id(value);

    if (!validation.isValid) {
      domUtils.showMessage(
        domElements.inputs.id,
        domElements.guides.id,
        validation.message,
        "error"
      );
      return;
    }

    try {
      domElements.buttons.idCheck.disabled = true;
      domElements.buttons.idCheck.textContent = "확인중";

      const res = await fetch(`${BASE_URL}/accounts/validate-username/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: value }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        domUtils.showMessage(
          domElements.inputs.id,
          domElements.guides.id,
          "멋진 아이디네요 :)",
          "success"
        );
        signupState.validation.id.isChecked = true;
        validationUtils.updateCurrentStep("pw"); // 다음 단계로 진행 허용
      } else {
        domUtils.showMessage(
          domElements.inputs.id,
          domElements.guides.id,
          "이미 사용 중인 아이디입니다.",
          "error"
        );
        signupState.validation.id.isChecked = false;
      }
    } catch (err) {
      console.error("중복 확인 오류:", err);
      domUtils.showMessage(
        domElements.inputs.id,
        domElements.guides.id,
        "중복 확인 중 오류가 발생했습니다.",
        "error"
      );
      signupState.validation.id.isChecked = false;
    } finally {
      domElements.buttons.idCheck.disabled = false;
      domElements.buttons.idCheck.textContent = "중복확인";
    }
  },

  init() {
    domElements.inputs.id.addEventListener(
      "blur",
      this.handleIdBlur.bind(this)
    );
    domElements.inputs.id.addEventListener("keydown", () => {
      signupState.validation.id.isChecked = false; // 입력이 변경되면 중복확인 초기화
    });
    // domElements.inputs.id.addEventListener(
    //   "input",
    //   this.handleIdInput.bind(this)
    // );
    domElements.buttons.idCheck.addEventListener(
      "click",
      this.handleIdCheck.bind(this)
    );
  },
};
