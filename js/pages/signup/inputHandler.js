import { validators } from "./validators.js";
import { BASE_URL } from "../../config.js";

export class InputHandler {
  constructor() {
    this.state = {
      validation: {
        id: { isValid: false, isChecked: false },
        pw: { isValid: false },
        pwCheck: { isValid: false },
        name: { isValid: false },
        phone: { isValid: false },
        businessNumber: { isValid: false, isChecked: false },
        storeName: { isValid: false },
      },
      inputOrder: [
        "id",
        "pw",
        "pwCheck",
        "name",
        "phone2",
        "phone3",
        "businessNumber",
        "storeName",
        "checkbox",
      ],
      currentStep: 0,
    };

    this.elements = this.getElements();
    this.pwImg = null;
    this.pwCheckImg = null;
  }

  getElements() {
    return {
      inputs: {
        id: document.getElementById("id"),
        pw: document.getElementById("pw"),
        pwCheck: document.getElementById("pwCheck"),
        name: document.getElementById("name"),
        phone1: document.getElementById("phone1"),
        phone2: document.getElementById("phone2"),
        phone3: document.getElementById("phone3"),
        businessNumber: document.getElementById("businessNumber"),
        storeName: document.getElementById("storeName"),
        checkbox: document.getElementById("terms-check"),
      },
      guides: {
        id: document.getElementById("id-guide"),
        pw: document.getElementById("pw-guide"),
        pwCheck: document.getElementById("pwCheck-guide"),
        name: document.getElementById("name-guide"),
        phone: document.getElementById("phone-guide"),
        businessNumber: document.getElementById("businessNumber-guide"),
        storeName: document.getElementById("storeName-guide"),
      },
      buttons: {
        idCheck: document.getElementById("id-check-btn"),
        businessNumberCheck: document.getElementById(
          "businessNumber-check-btn"
        ),
      },
    };
  }

  showMessage(element, guideElement, message, type = "error") {
    const colors = {
      error: "#EB5757",
      success: "#21bf48",
      default: "",
    };

    if (type === "error") {
      element.classList.add("fail");
    } else {
      element.classList.remove("fail");
    }

    guideElement.style.color = colors[type];
    guideElement.textContent = message;
  }

  clearMessage(element, guideElement) {
    element.classList.remove("fail");
    guideElement.style.color = "";
    guideElement.textContent = "";
  }

  getGuideElement(inputId) {
    const guideMap = {
      id: this.elements.guides.id,
      pw: this.elements.guides.pw,
      pwCheck: this.elements.guides.pwCheck,
      name: this.elements.guides.name,
      phone2: this.elements.guides.phone,
      phone3: this.elements.guides.phone,
      businessNumber: this.elements.guides.businessNumber,
      storeName: this.elements.guides.storeName,
      checkbox: null,
    };
    return guideMap[inputId];
  }

  // ------- 위에서부터 순서대로 input 입력 유도 -------
  getCurrentStepIndex(inputId) {
    return this.state.inputOrder.indexOf(inputId);
  }

  isInputOrderValid(targetInputId) {
    const targetIndex = this.getCurrentStepIndex(targetInputId);
    return targetIndex <= this.state.currentStep;
  }

  updateCurrentStep(inputId) {
    const index = this.getCurrentStepIndex(inputId);
    if (index >= this.state.currentStep) {
      this.state.currentStep = index + 1;
    }
  }

  // 순서대로 입력하지 않을 시 메시지를 띄움
  showOrderWarning(targetInputId) {
    const targetIndex = this.getCurrentStepIndex(targetInputId);

    for (let i = 0; i < targetIndex; i++) {
      const inputId = this.state.inputOrder[i];
      const input = this.elements.inputs[inputId];
      const guideElement = this.getGuideElement(inputId);

      if (input && guideElement && input.value.trim().length === 0) {
        guideElement.style.color = "#EB5757";
        guideElement.textContent = "필수 정보입니다.";
      }
    }
  }

  handleInputFocus(e) {
    const inputId = e.target.id;

    if (!this.isInputOrderValid(inputId)) {
      this.showOrderWarning(inputId);
    }
  }

  // -------------------------------------------------

  // ------------------- id check --------------------

  handleIdBlur() {
    const value = this.elements.inputs.id.value.trim();
    const validation = validators.id(value, this.state.validation.id.isChecked);

    this.state.validation.id.isValid = validation.isValid;

    if (!validation.isValid && validation.message) {
      // 유효성 검사 실패(빈 값 X)
      this.showMessage(
        this.elements.inputs.id,
        this.elements.guides.id,
        validation.message,
        "error"
      );
    } else if (
      validation.isValid &&
      validation.message &&
      this.state.validation.id.isChecked
    ) {
      // 아이디 유효성 검사 통과, 중복 체크 통과
      this.showMessage(
        this.elements.inputs.id,
        this.elements.guides.id,
        validation.message,
        "success"
      );
    } else if (validation.isValid && validation.message) {
      // 아이디 유효성 검사 통과, 중복 체크 X
      this.showMessage(
        this.elements.inputs.id,
        this.elements.guides.id,
        validation.message,
        "error"
      );
    } else {
      // 입력 전(빈 값)
      // 입력 안하고 지나가면 순서 체크에서 '필수입니다'
      this.clearMessage(this.elements.inputs.id, this.elements.guides.id);
    }
  }

  async handleIdCheck(e) {
    e.preventDefault();

    const value = this.elements.inputs.id.value.trim();
    const validation = validators.id(value, false);

    if (!validation.isValid) {
      this.showMessage(
        this.elements.inputs.id,
        this.elements.guides.id,
        validation.message,
        "error"
      );
      return;
    }

    try {
      this.elements.buttons.idCheck.disabled = true;
      this.elements.buttons.idCheck.textContent = "확인중";

      const response = await fetch(`${BASE_URL}/accounts/validate-username/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: value }),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        this.showMessage(
          this.elements.inputs.id,
          this.elements.guides.id,
          "멋진 아이디네요 :)",
          "success"
        );
        this.state.validation.id.isChecked = true;
        this.updateCurrentStep("pw");
      } else {
        this.showMessage(
          this.elements.inputs.id,
          this.elements.guides.id,
          "이미 사용 중인 아이디입니다.",
          "error"
        );
        this.state.validation.id.isChecked = false;
      }
    } catch (err) {
      console.error("중복 확인 오류:", err);
      this.showMessage(
        this.elements.inputs.id,
        this.elements.guides.id,
        "중복 확인 중 오류가 발생했습니다.",
        "error"
      );
      this.state.validation.id.isChecked = false;
    } finally {
      this.elements.buttons.idCheck.disabled = false;
      this.elements.buttons.idCheck.textContent = "중복확인";
    }
  }

  // -------------------------------------------------

  // ------------------- pw check --------------------
  handlePwBlur() {
    const pwValue = this.elements.inputs.pw.value.trim();
    const validation = validators.pw(pwValue);

    this.state.validation.pw.isValid = validation.isValid;

    if (!validation.isValid && validation.message) {
      this.showMessage(
        this.elements.inputs.pw,
        this.elements.guides.pw,
        validation.message,
        "error"
      );
    } else {
      this.clearMessage(this.elements.inputs.pw, this.elements.guides.pw);
    }

    if (this.pwImg) {
      this.pwImg.src = validation.isValid
        ? "./assets/images/icon-check-on.svg"
        : "./assets/images/icon-check-off.svg";
    }

    if (validation.isValid) {
      this.updateCurrentStep("pwCheck");
    }
  }

  handlePwCheckInput() {
    const pwValue = this.elements.inputs.pw.value.trim();
    const pwCheckValue = this.elements.inputs.pwCheck.value.trim();
    const validation = validators.pwCheck(pwCheckValue, pwValue);

    this.state.validation.pwCheck.isValid = validation.isValid;

    if (!validation.isValid && validation.message) {
      this.showMessage(
        this.elements.inputs.pwCheck,
        this.elements.guides.pwCheck,
        validation.message,
        "error"
      );
    } else {
      this.clearMessage(
        this.elements.inputs.pwCheck,
        this.elements.guides.pwCheck
      );
    }

    if (this.pwCheckImg) {
      this.pwCheckImg.src = validation.isValid
        ? "./assets/images/icon-check-on.svg"
        : "./assets/images/icon-check-off.svg";
    }

    if (validation.isValid) {
      this.updateCurrentStep("name");
    }
  }
  // -------------------------------------------------

  // ----------------- name check -------------------
  handleNameBlur() {
    const name = this.elements.inputs.name.value.trim();
    const validation = validators.name(name);

    this.state.validation.name.isValid = validation.isValid;

    if (!validation.isValid && validation.message) {
      this.showMessage(
        this.elements.inputs.name,
        this.elements.guides.name,
        validation.message,
        "error"
      );
    } else {
      this.clearMessage(this.elements.inputs.name, this.elements.guides.name);
    }

    if (validation.isValid) {
      this.updateCurrentStep("phone");
    }
  }
  // -------------------------------------------------

  // ----------------- phone check -------------------
  handlePhoneInput() {
    const phone2 = this.elements.inputs.phone2.value.trim();
    const phone3 = this.elements.inputs.phone3.value.trim();
    const validation = validators.phone(phone2, phone3);

    this.state.validation.phone.isValid = validation.isValid;

    if (!validation.isValid && validation.message) {
      this.elements.guides.phone.style.color = "#EB5757";
      this.elements.guides.phone.textContent = validation.message;
    } else {
      this.elements.guides.phone.style.color = "";
      this.elements.guides.phone.textContent = "";
    }

    if (validation.isValid) {
      this.updateCurrentStep("checkbox");
    }
  }
  // -------------------------------------------------

  checkAllValidation() {
    const signupBtn = document.getElementById("signupBtn");

    const requiredFields = ["id", "pw", "pwCheck", "name", "phone"];
    const isAllValid = requiredFields.every(
      (field) => this.state.validation[field]?.isValid
    );

    const isIdChecked = this.state.validation.id.isChecked;

    signupBtn.disabled = !(
      isAllValid &&
      isIdChecked &&
      this.elements.inputs.checkbox.checked
    );
  }

  init() {
    this.pwImg = document.getElementById("pw-img");
    this.pwCheckImg = document.getElementById("pwCheck-img");

    // id
    this.elements.inputs.id.addEventListener(
      "blur",
      this.handleIdBlur.bind(this)
    );
    this.elements.inputs.id.addEventListener("keydown", () => {
      // 새로 입력 시 중복체크 초기화
      this.state.validation.id.isChecked = false;
    });
    this.elements.buttons.idCheck.addEventListener(
      "click",
      this.handleIdCheck.bind(this)
    );

    // pw
    this.elements.inputs.pw.addEventListener(
      "blur",
      this.handlePwBlur.bind(this)
    );
    this.elements.inputs.pwCheck.addEventListener(
      "input",
      this.handlePwCheckInput.bind(this)
    );

    // name
    this.elements.inputs.name.addEventListener(
      "blur",
      this.handleNameBlur.bind(this)
    );

    // phone
    const phoneGroup = document.querySelector(".phone-group");
    if (phoneGroup) {
      phoneGroup.addEventListener("input", this.handlePhoneInput.bind(this));
    }

    // 입력 순서 검사가 필요한 필드 이벤트 등록
    const inputsToCheck = [
      this.elements.inputs.pw,
      this.elements.inputs.pwCheck,
      this.elements.inputs.name,
      this.elements.inputs.phone2,
      this.elements.inputs.phone3,
      this.elements.inputs.businessNumber,
      this.elements.inputs.storeName,
    ];

    inputsToCheck.forEach((input) => {
      if (input) {
        input.addEventListener("focus", this.handleInputFocus.bind(this));
      }
    });
    this.elements.inputs.checkbox.addEventListener("focus", () => {
      if (!this.isInputOrderValid("checkbox")) {
        this.showOrderWarning("checkbox");
      }
    });

    // 입력 완료 시 가입하기 버튼 활성화
    document.addEventListener("input", () => this.checkAllValidation());
    this.elements.inputs.checkbox.addEventListener("change", () =>
      this.checkAllValidation()
    );
  }
}
