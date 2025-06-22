export class Footer {
  constructor() {
    this.element = document.createElement("footer");
    this.render();
  }

  render() {
    this.element.innerHTML = `
        <div class="footer-container">
        <nav class="footer-nav">
          <ul class="nav-etc">
            <li>
              <a href="">호두샵 소개</a>
            </li>
            <li>
              <span class="separator" aria-hidden="true">|</span>
            </li>
            <li>
              <a href="">이용약관</a>
            </li>
            <li>
              <span class="separator" aria-hidden="true">|</span>
            </li>
            <li>
              <a href=""><em>개인정보처리방침</em></a>
            </li>
            <li>
              <span class="separator" aria-hidden="true">|</span>
            </li>
            <li>
              <a href="">전자금융거래약관</a>
            </li>
            <li>
              <span class="separator" aria-hidden="true">|</span>
            </li>
            <li>
              <a href="">청소년보호정책</a>
            </li>
            <li>
              <span class="separator" aria-hidden="true">|</span>
            </li>
            <li>
              <a href="">제휴문의</a>
            </li>
          </ul>

          <ul class="nav-sns">
            <li>
              <a href="#" aria-label="인스타그램 페이지로 이동">
                <img src="./assets/images/icon-insta.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="페이스북 페이지로 이동">
                <img src="./assets/images/icon-fb.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="유튜브 페이지로 이동">
                <img src="./assets/images/icon-yt.svg" alt="" />
              </a>
            </li>
          </ul>
        </nav>
        <dl class="company-info">
          <div>
            <dt class="sr-only">주식회사명</dt>
            <dd>(주)HODU SHOP</dd>
          </div>
          <div>
            <dt class="sr-only">주소</dt>
            <dd>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</dd>
          </div>
          <div>
            <dt>사업자번호</dt>
            <dd>000-0000-0000 | 통신판매업</dd>
          </div>
          <div>
            <dt>대표</dt>
            <dd>김호두</dd>
          </div>
        </dl>
      </div>
        `;

    document.body.append(this.element);
  }
}
