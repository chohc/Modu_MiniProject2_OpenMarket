/**
 * 모달 열기/닫기 기능을 제공하는 유틸리티 함수
 *
 * @param {string} openBtnSelector - 모달을 여는 버튼의 CSS 선택자
 * @param {string} modalSelector - 모달 요소의 CSS 선택자
 * @param {function} callback - 모달 내부 클릭 시 실행될 콜백 함수
 * @param {string} [closeBtnSelector="modal"] - 모달을 닫는 버튼의 CSS 선택자 또는 "modal"
 *
 * @description
 * - 모달 열기: openBtn 클릭 시 모달을 토글
 * - 모달 닫기: 외부 영역 클릭 시 모달 닫기
 * - closeBtnSelector가 "modal"이면 모달 자체 클릭 시 닫기 (기본동작)
 * - closeBtnSelector가 다른 값이면 해당 버튼 클릭 시 닫기
 * - 모달 내부 클릭: callback 함수 실행 (예: 드롭다운 항목 선택)
 * - 이벤트 버블링 차단: 모달 내부 클릭은 외부로 전파되지 않음
 *
 */

export function initModalHandler(
  openBtnSelector,
  modalSelector,
  callback,
  closeBtnSelector = "modal"
) {
  const openBtn = document.querySelector(openBtnSelector);
  const modal = document.querySelector(modalSelector);

  if (!openBtn || !modal) {
    console.error("Modal elements not found:", {
      openBtnSelector,
      modalSelector,
    });
    return;
  }

  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = modal.style.display === "block" ? "none" : "block";
  });

  modal.addEventListener("click", (e) => {
    e.stopPropagation();
    if (callback) {
      callback(e.target);
    }

    if (closeBtnSelector === "modal") {
      modal.style.display = "none";
    }
  });

  // 별도 닫기 버튼이 있는 경우
  if (closeBtnSelector !== "modal") {
    const closeBtn = document.querySelector(closeBtnSelector);
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.style.display = "none";
      });
    } else {
      console.warn("Close button not found:", closeBtnSelector);
    }
  }

  document.body.addEventListener("click", (e) => {
    modal.style.display = "none";
  });
}
