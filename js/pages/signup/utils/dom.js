export const domElements = {
  tabGroup: document.querySelector(".tab-group"),
  inputs: {
    id: document.getElementById("id"),
    pw: document.getElementById("pw"),
    pwCheck: document.getElementById("pw-check"),
    name: document.getElementById("name"),
    phone1: document.getElementById("selected-value"),
    phone2: document.getElementById("phone2"),
    phone3: document.getElementById("phone3"),
    businessNumber: document.getElementById("business-number"),
    storeName: document.getElementById("store-name"),
  },
  guides: {
    id: document.getElementById("id-guide"),
    pw: document.getElementById("pw-guide"),
    pwCheck: document.getElementById("pw-check-guide"),
    name: document.getElementById("name-guide"),
    phone: document.getElementById("phone-guide"),
    businessNumber: document.getElementById("business-number-guide"),
    storeName: document.getElementById("store-name-guide"),
  },
  buttons: {
    idCheck: document.getElementById("id-check-btn"),
    businessNumberCheck: document.getElementById("business-number-check-btn"),
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
      "pw-check": domElements.guides.pwCheck,
      name: domElements.guides.name,
      phone2: domElements.guides.phone,
      phone3: domElements.guides.phone,
    };
    return guideMap[inputId];
  },
};
