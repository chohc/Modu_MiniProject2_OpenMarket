export const validators = {
  id(value, isChecked = false) {
    const regex = /^[a-zA-Z0-9]+$/;

    if (!value.trim()) {
      return { isValid: false, message: null };
    }
    if (value.length > 20 || !regex.test(value)) {
      return {
        isValid: false,
        message: "20자 이내의 영문자 소문자, 대문자, 숫자만 사용 가능합니다.",
      };
    }
    if (!isChecked) {
      return {
        isValid: true,
        message: "아이디 유효성 검사를 해주세요.",
      };
    }
    if (isChecked) {
      return {
        isValid: true,
        message: "멋진 아이디네요:)",
      };
    }

    return { isValid: true, message: "" };
  },

  pw(value) {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/i;

    if (!value.trim()) {
      return { isValid: false, message: "" };
    }

    if (value.length < 8 || !regex.test(value)) {
      return {
        isValid: false,
        message: "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
      };
    }

    return { isValid: true, message: "" };
  },

  pwCheck(value, pwValue) {
    if (!value.trim()) {
      return { isValid: false, message: "" };
    }

    if (value !== pwValue) {
      return { isValid: false, message: "비밀번호가 일치하지 않습니다." };
    }

    return { isValid: true, message: "" };
  },

  name(value) {
    if (!value.trim()) {
      return { isValid: false, message: "" };
    }

    return { isValid: true, message: "" };
  },

  phone(phone2, phone3) {
    const phoneRegex = /^\d{4}$/;

    if (!phone2.trim() || !phone3.trim()) {
      return { isValid: false, message: "필수 정보입니다." };
    }

    if (!phoneRegex.test(phone2) || !phoneRegex.test(phone3)) {
      return { isValid: false, message: "올바른 휴대폰 번호를 입력해주세요." };
    }

    return { isValid: true, message: "" };
  },

  businessNumber(value) {
    const businessRegex = /^\d{3}-\d{2}-\d{5}$/;

    if (!value.trim()) {
      return { isValid: false, message: "필수 정보입니다." };
    }

    if (!businessRegex.test(value)) {
      return {
        isValid: false,
        message: "올바른 사업자등록번호를 입력해주세요.",
      };
    }

    return { isValid: true, message: "" };
  },

  storeName(value) {
    if (!value.trim()) {
      return { isValid: false, message: "필수 정보입니다." };
    }
    return { isValid: true, message: "" };
  },
};
