import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitter) {
    super(popupSelector);
    this._formSubmitter = formSubmitter;
    this._inputs = this.popup.querySelectorAll(".popup__input");
    this._inputValues = {};
  }

  setInputValues(values) {
    this._inputValues = values;
    this._inputs.forEach((input) => {
      input.value = this._inputValues[input.name];
    });
  }

  _getInputValues() {
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup
      .querySelector(".popup__submit-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this._formSubmitter(this._getInputValues());
        this.close();
      });
  }

  close() {
    super.close();
    this._inputs.forEach((input) => {
      input.value = "";
    });
  }
}
