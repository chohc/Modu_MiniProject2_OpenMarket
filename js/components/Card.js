export class Card {
  constructor({ id = 1, imgURL, brand = "", name = "", price = "" } = {}) {
    this.element = document.createElement("a");
    this.element.className = "card";
    this.element.href = `../../productDetail.html?id=${id}`;
    this.render(imgURL, brand, name, price);
  }

  render(imgURL, brand, name, price) {
    this.element.innerHTML = `
        <img
          src="${imgURL}"
          alt="${name}"
          class="card__img"
        />
        <span class="card__brand">${brand}</span>
        <p class="card__name">${name}</p>
        <p class="card__price">
          <span class="m-price">
          ${price.toLocaleString()}
          </span>
         <span class="m-price currency">
         원
         </span>
        </p>
    `;
  }
}
