export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._boundHandleEscClose);
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._boundHandleEscClose);
  }

  setEventListeners() {
    this.popup.addEventListener("click", (event) => {
      if (
        event.target === event.currentTarget ||
        event.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
