export class ResponsiveUtils {
  static isMobile() {
    return window.innerWidth <= 768;
  }

  static isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  static isDesktop() {
    return window.innerWidth > 1024;
  }

  static addResizeListener(callback) {
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(callback, 150);
    });
  }
}
