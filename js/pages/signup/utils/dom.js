export const domElements = {
  tabGroup: document.querySelector(".tab-group"),
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
    businessNumberCheck: document.getElementById("businessNumber-check-btn"),
  },
  modal: {
    dropdown: document.querySelector(".num-dropdown"),
    openBtn: document.querySelector(".select-btn"),
  },
};

export const domUtils = {
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
  },

  clearMessage(element, guideElement) {
    element.classList.remove("fail");
    guideElement.style.color = "";
    guideElement.textContent = "";
  },

  getGuideElement(inputId) {
    const guideMap = {
      id: domElements.guides.id,
      pw: domElements.guides.pw,
      pwCheck: domElements.guides.pwCheck,
      name: domElements.guides.name,
      phone2: domElements.guides.phone,
      phone3: domElements.guides.phone,
      businessNumber: domElements.guides.businessNumber,
      storeName: domElements.guides.storeName,
    };
    return guideMap[inputId];
  },
};
