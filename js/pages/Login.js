import { BASE_URL } from "../config.js";

const form = document.querySelector(".login-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleLogin();
});

async function handleLogin() {
  const username = form.id.value.trim();
  const password = form.password.value.trim();

  if (!username || !password) {
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
      const errorData = await response.json();
      throw new Error(errorData.message || "로그인에 실패했습니다.");
    }

    const data = await response.json();
    console.log("로그인 성공", data);

    // save token
    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.user));

    // redirect
    window.location.href = "/";
  } catch (error) {
    console.error("로그인 에러: ", error);
  }
}

// button 활성화
let member_position = "";
const tabGroup = document.querySelector(".tab-group");
tabGroup.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const activeBtn = tabGroup.querySelector(".tab-btn.active");
    if (activeBtn) activeBtn.classList.remove("active");
    e.target.classList.add("active");

    member_position = e.target.textContent;
  }
});
