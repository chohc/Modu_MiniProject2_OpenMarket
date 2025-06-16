export function createRouter(mainElement) {
  const routes = {
    "/": () => import("./pages/Home.js"),
    "/product/:id": () => import("./pages/ProductDetail.js"),
    "/login": () => import("./pages/Login.js"),
    "/signup": () => import("./pages/Signup.js"),
  };

  const handleRoute = async () => {
    const currentPath = window.location.pathname;
    console.log("현재 경로:", currentPath);

    // header 유무
    if (["/login", "/signup"].includes(currentPath)) {
      document.getElementById("header").style.display = "none";
    } else {
      document.getElementById("header").style.display = "block";
    }

    const matchedRoute = findMatchingRoute(currentPath);

    if (matchedRoute) {
      try {
        mainElement.innerHTML = '<div class="loading">페이지 로딩 중...</div>';

        const pageModule = await matchedRoute.pageLoader();
        const PageComponent = pageModule.default;
        const page = PageComponent(matchedRoute.params);
        mainElement.innerHTML = page.render();

        if (page.init) {
          page.init();
        }

        console.log("페이지 렌더링 완료:", currentPath);
      } catch (error) {
        console.error("페이지 로드 실패:", error);
        mainElement.innerHTML =
          '<div class="error">페이지를 불러올 수 없습니다.</div>';
      }
    } else {
      // 매칭되는 라우트가 없으면 404 에러
      console.log("404 - 페이지를 찾을 수 없음:", currentPath);
      mainElement.innerHTML =
        '<div class="error">404 - 페이지를 찾을 수 없습니다.</div>';
    }
  };

  // routes에 정의된 경로들 중 현재 경로와 매칭되는 것을 찾음
  const findMatchingRoute = (currentPath) => {
    for (const routePattern in routes) {
      console.log("라우트 패턴 확인:", routePattern, "현재 경로:", currentPath);

      const regex = createRegexFromPattern(routePattern);

      const match = currentPath.match(regex);

      if (match) {
        console.log("매칭된 라우트:", routePattern);

        const params = extractParams(routePattern, match);
        console.log("추출된 파라미터:", params);

        return {
          pageLoader: routes[routePattern],
          params: params,
        };
      }
    }
    return null;
  };

  // URL 패턴을 정규표현식으로 변환
  // 예: "/product/:id" → /^\/product\/([^\/]+)$/
  const createRegexFromPattern = (pattern) => {
    // :id, :name 같은 파라미터를 ([^/]+)로 변환 (슬래시가 아닌 모든 문자)
    const regexPattern = pattern
      .replace(/:\w+/g, "([^/]+)") // :id → ([^/]+)
      .replace(/\//g, "\\/"); // / → \/

    // 시작(^)과 끝($)을 명시해서 정확히 매칭
    const regex = new RegExp(`^${regexPattern}$`);
    console.log("패턴:", pattern, "→ 정규표현식:", regex);
    return regex;
  };

  // URL에서 파라미터 추출
  // 예: "/product/:id"와 "/product/123"에서 {id: "123"} 추출
  const extractParams = (pattern, matchResult) => {
    // 패턴에서 파라미터 이름들 찾기 (예: [":id", ":name"])
    const paramNames = pattern.match(/:\w+/g) || [];
    console.log("파라미터 이름들:", paramNames);

    const params = {};

    // 각 파라미터 이름과 매칭된 값을 연결
    paramNames.forEach((paramName, index) => {
      const cleanParamName = paramName.slice(1); // ":" 제거 (":id" → "id")
      const value = matchResult[index + 1]; // 매칭된 값 (matchResult[0]은 전체 매칭)
      params[cleanParamName] = value;
    });

    return params;
  };

  // URL 변경 없이 페이지 이동 (SPA의 핵심!)
  const navigateTo = (path) => {
    console.log("페이지 이동:", path);

    // 브라우저 히스토리에 새 URL 추가 (페이지 새로고침 없음!)
    window.history.pushState({}, "", path);

    // 새로운 경로에 해당하는 페이지 렌더링
    handleRoute();
  };

  // 라우터 초기화
  const init = () => {
    console.log("라우터 초기화");

    // 페이지 첫 로드시 현재 URL에 맞는 페이지 렌더링
    handleRoute();

    // 브라우저 뒤로가기/앞으로가기 버튼 처리
    window.addEventListener("popstate", () => {
      console.log("브라우저 뒤로가기/앞으로가기");
      handleRoute(); // URL이 변경되면 해당 페이지 렌더링
    });
  };

  // 외부에서 사용할 수 있는 함수들 반환
  return {
    init, // 라우터 초기화
    navigateTo, // 프로그래밍 방식으로 페이지 이동
    handleRoute, // 수동으로 라우트 처리
  };
}
