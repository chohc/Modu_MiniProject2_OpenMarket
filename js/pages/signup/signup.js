import { InputHandler } from "./inputHandler.js";
import { initTabHandler } from "../../utils/tabUtils.js";
import { initModalHandler } from "../../utils/modalUtils.js";
import { BASE_URL } from "../../config.js";
import { Footer } from "../../components/Footer.js";

let isBuyer = true;
let signupBtn;

function init() {
  signupBtn = document.getElementById("signupBtn");

  const inputHandler = new InputHandler();
  inputHandler.init();
  initTabHandler(".tab-group", toggleSellerMode);
  initModalHandler(".select-btn", ".num-dropdown", selectPhone1);
  new Footer();

  signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleSignUp();
  });
}

// Tab Button
function toggleSellerMode(target) {
  const isSellerMode = target.textContent.trim() === "판매회원가입";
  const sellerFields = document.querySelector(".seller-fields");
  isBuyer = !isSellerMode;

  if (sellerFields) {
    sellerFields.style.display = isSellerMode ? "block" : "none";
    sellerFields.setAttribute("aria-hidden", !isSellerMode);
  }
}

// Modal
function selectPhone1(target) {
  if (target.tagName === "P") {
    const phone1 = document.getElementById("phone1");

    phone1.textContent = target.textContent;
  }
}

function getFormData() {
  return {
    id: document.getElementById("id").value.trim(),
    pw: document.getElementById("pw").value.trim(),
    name: document.getElementById("name").value.trim(),
    phone1: document.getElementById("phone1").textContent,
    phone2: document.getElementById("phone2").value.trim(),
    phone3: document.getElementById("phone3").value.trim(),
    businessNumber:
      document.getElementById("businessNumber")?.value.trim() || "",
    storeName: document.getElementById("storeName")?.value.trim() || "",
  };
}

async function handleSignUp() {
  try {
    const formData = getFormData();

    const endpoint = isBuyer
      ? "/accounts/buyer/signup/"
      : "/accounts/seller/signup/";
    const requestBody = isBuyer
      ? {
          username: formData.id,
          password: formData.pw,
          name: formData.name,
          phone_number: `${formData.phone1}${formData.phone2}${formData.phone3}`,
        }
      : {
          username: formData.id,
          password: formData.pw,
          name: formData.name,
          phone_number: `${formData.phone1}${formData.phone2}${formData.phone3}`,
          company_registration_number: formData.businessNumber,
          store_name: formData.storeName,
        };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
      alert("회원가입이 완료되었습니다.");
      window.location.href = "./login.html";
    } else {
      const phone = document.getElementById("phone-guide");
      if (data.phone_number) {
        phone.style.color = "#EB5757";
        phone.textContent = "해당 사용자 전화번호는 이미 존재합니다.";
      } else {
        phone.textContent = "";
      }
    }
  } catch (error) {
    console.error("회원가입 에러: ", error);
  }
}

document.addEventListener("DOMContentLoaded", init);
