export const signupState = {
  memberPosition: "",
  validation: {
    // isValid: 유효성 검사
    // isChecked: 중복 체크, 인증
    id: { isValid: false, isChecked: false },
    pw: { isValid: false },
    pwCheck: { isValid: false },
    name: { isValid: false },
    phone: { isValid: false },
    businessNumber: { isValid: false },
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
  ],
  currentStep: 0,
};
