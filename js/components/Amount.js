/**
 * 수량 증감 컴포넌트
 */
export class Amount {
  /**
   * @param {Object} options - 컴포넌트 옵션
   * @param {number} [options.initialValue=1] - 초기 수량
   * @param {number} [options.min=1] - 최소 수량
   * @param {number} [options.max=999] - 최대 수량
   * @param {string} [options.containerSelector] - 컨테이너 CSS 클래스
   * @param {function} [options.onChange] - 수량 변경 시 콜백 함수
   */
  constructor(options = {}) {
    const {
      initialValue = 1,
      min = 1,
      max = 999,
      containerSelector,
      onChange = null,
    } = options;

    this.min = min;
    this.max = max;
    this.onChange = onChange;
    this.currentValue = initialValue;
    this.containerSelector = containerSelector;

    this.createElement();
    this.setupEventListeners();
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.className = "product__count";

    this.minusBtn = document.createElement("button");
    this.minusBtn.className = "minus";
    this.minusBtn.setAttribute("aria-label", "수량 감소");
    this.minusBtn.type = "button";

    this.countInput = document.createElement("input");
    this.countInput.type = "number";
    this.countInput.value = this.currentValue;
    this.countInput.min = this.min;
    this.countInput.max = this.max;
    this.countInput.setAttribute("aria-label", "상품 수량");

    this.plusBtn = document.createElement("button");
    this.plusBtn.className = "plus";
    this.plusBtn.setAttribute("aria-label", "수량 증가");
    this.plusBtn.type = "button";

    this.element.append(this.minusBtn, this.countInput, this.plusBtn);

    if (this.containerSelector) {
      document.querySelector(this.containerSelector)?.append(this.element);
    }
  }

  setupEventListeners() {
    this.minusBtn.addEventListener("click", () => this.updateQuantity("-"));

    this.plusBtn.addEventListener("click", () => this.updateQuantity("+"));

    this.countInput.addEventListener("input", () => {
      this.validateAndUpdate();
    });
  }

  updateQuantity(operation) {
    let newCount = Number(this.countInput.value);

    if (operation === "-") {
      if (newCount > 1) newCount -= 1;
    } else {
      newCount += 1;
    }

    this.setValue(newCount);
  }

  validateAndUpdate() {
    let value = parseInt(this.countInput.value);

    if (isNaN(value) || value < this.min) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    }

    this.setValue(value);
  }

  setValue(value) {
    if (value < this.min) value = this.min;
    if (value > this.max) value = this.max;

    const oldValue = this.currentValue;
    this.currentValue = value;
    this.countInput.value = value;

    // 값이 변경되었을 때만 콜백 실행
    if (oldValue !== value && this.onChange) {
      this.onChange(value);
    }
  }
}
