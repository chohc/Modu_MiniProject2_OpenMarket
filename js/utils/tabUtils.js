/**
 * 탭 클릭 핸들러를 초기화하는 유틸리티 함수
 * @param {string} selector - 탭 그룹의 CSS 선택자
 * @param {Function} callback - 탭 변경 시 실행할 콜백 함수 (선택사항)
 * @param {string} tabButtonSelector - 탭 버튼의 CSS 선택자 (기본값: '[aria-selected]')
 */
export function initTabHandler(
  selector,
  callback = null,
  tabButtonSelector = "[aria-selected]"
) {
  const tabGroup = document.querySelector(selector);

  if (!tabGroup) {
    console.warn(`탭 그룹을 찾을 수 없습니다: ${selector}`);
    return;
  }

  tabGroup.addEventListener("click", handleTabClick);

  function handleTabClick(e) {
    if (e.target.tagName === "BUTTON" && e.target.matches(tabButtonSelector)) {
      const activeTab = tabGroup.querySelector(
        `${tabButtonSelector}[aria-selected="true"]`
      );

      if (activeTab) {
        activeTab.setAttribute("aria-selected", "false");
      }

      e.target.setAttribute("aria-selected", "true");

      if (callback && typeof callback === "function") {
        callback(e.target, e);
      }
    }
  }
}
