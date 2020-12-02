import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  open(imageData) {
    const popupPhoto = this.popup.querySelector(".popup__photo");
    popupPhoto.src = imageData.src;
    popupPhoto.alt = imageData.alt;
    popupCaption.textContent = this.popup.querySelector(".popup__caption").imageData.caption;
    super.open();
  }
}