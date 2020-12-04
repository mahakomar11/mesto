import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  open(imageData) {
    const popupPhoto = this.popup.querySelector(".popup__photo");
    popupPhoto.src = imageData.src;
    popupPhoto.alt = imageData.alt;
    this.popup.querySelector(".popup__caption").textContent = imageData.caption;
    super.open();
  }
}