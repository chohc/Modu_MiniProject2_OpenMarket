// button 활성화
let member_position = "";
const tabGroup = document.querySelector(".tab-group");
tabGroup.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.tagName === "BUTTON") {
    const activeBtn = tabGroup.querySelector(".tab-btn.active");
    if (activeBtn) activeBtn.classList.remove("active");
    e.target.classList.add("active");

    console.log(e.target);

    member_position = e.target.textContent;
  }
});

// 휴대폰 번호 모달
const modal = document.querySelector(".num-dropdown");
const openModalBtn = document.querySelector(".select-btn");

document.body.addEventListener("click", () => {
  modal.style.display = "none";
});
openModalBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  modal.style.display = "block";
});
modal.addEventListener("click", (e) => {
  e.stopPropagation();
  changePhoneNum(e.target.textContent);
  modal.style.display = "none";
});

function changePhoneNum(selectedNum) {
  console.log(selectedNum);
  const phoneNum1 = document.getElementById("selected-value");
  phoneNum1.textContent = selectedNum;
}
