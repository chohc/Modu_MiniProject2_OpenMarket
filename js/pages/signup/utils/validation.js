import { signupState } from "../state/signupState.js";

export const validationUtils = {
  getCurrentStepIndex(inputId) {
    return signupState.inputOrder.indexOf(inputId);
  },

  isInputOrderValid(targetInputId) {
    const targetIndex = this.getCurrentStepIndex(targetInputId);
    return targetIndex <= signupState.currentStep;
  },

  updateCurrentStep(inputId) {
    const index = this.getCurrentStepIndex(inputId);
    if (index >= signupState.currentStep) {
      signupState.currentStep = index + 1; // 입력해야되는 인덱스
    }
  },

  // canProceedToNext() {
  //   const currentInputId = signupState.inputOrder[signupState.currentStep];

  //   switch (currentInputId) {
  //     case "id":
  //       return (
  //         signupState.validation.id.isValid &&
  //         signupState.validation.id.isChecked
  //       );
  //     case "pw":
  //       return signupState.validation.pw.isValid;
  //     case "pwCheck":
  //       return signupState.validation.pwCheck.isValid;
  //     case "name":
  //       return signupState.validation.name.isValid;
  //     case "phone2":
  //     case "phone3":
  //       return signupState.validation.phone.isValid;
  //     case "businessNumber":
  //       return signupState.validation.phone.isValid;
  //     case "storeName":
  //       return signupState.validation.phone.isValid;
  //     default:
  //       return false;
  //   }
  // },
};
