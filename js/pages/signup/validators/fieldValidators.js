import { signupState } from "../state/signupState.js";

export const fieldValidators = {
  id(value) {
    const regex = /^[a-zA-Z0-9]+$/;
    if (!value.trim()) {
      return { isValid: null };
    }
    // if (value.length < 4) {
    //   return { isValid: false, message: "아이디는 4자 이상 입력해주세요." };
    // }
    if (value.length > 20) {
      return { isValid: false, message: "아이디는 20자 이하로 입력해주세요." };
    }
    if (!regex.test(value)) {
      return {
        isValid: false,
        message: "20자 이내의 영문자 소문자, 대문자, 숫자만 사용 가능합니다.",
      };
    }
    if (!signupState.validation.id.isChecked) {
      return {
        isValid: true,
        message: "아이디 유효성 검사를 해주세요.",
      };
    }
    if (signupState.validation.id.isChecked) {
      return {
        isValid: true,
        message: "멋진 아이디네요:)",
      };
    }
    return { isValid: true, message: "" };
  },

  pw(value) {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value.trim()) {
      return { isValid: null };
    }
    if (value.length < 8) {
      return { isValid: false, message: "비밀번호는 8자 이상 입력해주세요." };
    }
    if (!regex.test(value)) {
      return {
        isValid: false,
        message: "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
      };
    }
    return { isValid: true, message: "" };
  },

  pwCheck(value, pwValue) {
    if (!value.trim()) {
      return { isValid: null };
    }
    if (value !== pwValue) {
      return { isValid: false, message: "비밀번호가 일치하지 않습니다." };
    }
    return { isValid: true, message: "" };
  },

  phone(phone2, phone3) {
    const phoneRegex = /^\d{4}$/;
    if (!phone2.trim() || !phone3.trim()) {
      return { isValid: false, message: "휴대폰 번호를 입력해주세요." };
    }
    if (!phoneRegex.test(phone2) || !phoneRegex.test(phone3)) {
      return { isValid: false, message: "올바른 휴대폰 번호를 입력해주세요." };
    }
    return { isValid: true, message: "" };
  },
};
