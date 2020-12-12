export default class Card {
  constructor(data, templateSelector) {
    this.name = data.name;
    this.photoSrc = data.link;
    this.photoAlt = `Фото, ${this.name}`;
    this.countLikes = data.countLikes;
    this.id = data.id;
    this.isLiked = data.isLiked;
    this.isMine = data.isMine;
    this._templateSelector = templateSelector;
    this._handleCardClick = data.handleCardClick;
    this._handleDeleteClick = data.handleDeleteClick;
    this._handleLikeClick = data.handleLikeClick;
  }

  toggleLike() {
    if (this.isLiked) {
      this._buttonLike.classList.remove("place__icon-like_active");
    } else {
      this._buttonLike.classList.add("place__icon-like_active");
    }
    this._element.querySelector(".place__like-count").textContent = this.countLikes;
    this.isLiked = !this.isLiked;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".place__icon-like");
    this._buttonLike.addEventListener("click", () => this._handleLikeClick(this));

    if (this.isMine) {
      this._buttonDelete = this._element.querySelector(".place__icon-delete");
      this._buttonDelete.classList.add("place__icon-delete_active");
      this._buttonDelete.addEventListener("click", () => this._handleDeleteClick(this));
    }
    

    this._photo.addEventListener("click", () => this._handleCardClick(this));
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
    this._element.querySelector(".place__like-count").textContent = this.countLikes;
  
    this._setEventListeners();

    if (this.isLiked) {
      this._buttonLike.classList.add("place__icon-like_active");
    }

    return this._element;
  }
}

