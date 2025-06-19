export const signupState = {
  memberPosition: "",
  validation: {
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
    "pw-check",
    "name",
    "phone2",
    "phone3",
    "businessNumber,storeName",
  ],
  currentStep: 0,
};
