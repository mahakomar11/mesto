import { openPopupShowCard } from "./index.js";

class Card {
  constructor(data, templateSelector) {
    this.name = data.name;
    this.photoSrc = data.link;
    this.photoAlt = `Фото, ${this.name}`;
    this._templateSelector = templateSelector;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("place__icon-like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".place__icon-like");
    this._buttonLike.addEventListener("click", () => this._toggleLike());

    const buttonDelete = this._element.querySelector(".place__icon-delete");
    buttonDelete.addEventListener("click", () => this._deleteCard());

    this._photo.addEventListener("click", () => openPopupShowCard(this));
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector(".place__photo");
    this._photo.src = this.photoSrc;
    this._photo.alt = this.photoAlt;
    this._element.querySelector(".place__title").textContent = this.name;

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
