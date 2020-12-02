export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add("popup_opened");
  }

  close() {
    this.popup.classList.remove("popup_opened");
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
    document.addEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
