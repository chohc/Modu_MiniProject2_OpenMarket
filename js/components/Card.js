import { BASE_URL } from "../config.js";

export class Card {
  constructor({
    id = 1,
    imgURL,
    manufacturer = "",
    name = "",
    price = "",
  } = {}) {
    this.element = document.createElement("a");
    this.element.className = "card";
    this.element.href = `${BASE_URL}/products/${id}`;
    this.render(imgURL, manufacturer, name, price);
  }

  render(imgURL, manufacturer, name, price) {
    this.element.innerHTML = `
        <img
          src="${imgURL}"
          alt="${name}"
          class="card__img"
        />
        <span class="card__manufacturer">${manufacturer}</span>
        <p class="card__name">${name}</p>
        <p class="card__price">
          ${price.toLocaleString()}<span class="card__price-won"> 원</span>
        </p>
    `;
  }
}
