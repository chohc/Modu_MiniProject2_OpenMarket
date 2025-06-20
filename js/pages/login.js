import { BASE_URL } from "../config.js";
import { initTabHandler } from "../utils/tabUtils.js";

const guideText = document.getElementById("login-guide");
const form = document.querySelector(".login-form");

function init() {
  initTabHandler(".tab-group");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await handleLogin();
  });
}

document.addEventListener("DOMContentLoaded", init);

async function handleLogin() {
  const username = form.id.value.trim();
  const password = form.password.value.trim();

  if (!username) {
    guideText.textContent = "아이디를 입력해 주세요.";
    return;
  } else if (!password) {
    guideText.textContent = "비밀번호를 입력해 주세요.";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      guideText.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
      return;
    }

    const data = await response.json();
    console.log("로그인 성공", data);

    // save token
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("user_info", JSON.stringify(data.user));

    // redirect
    window.location.href = "/";
  } catch (error) {
    console.error("로그인 에러: ", error);
  }
}
