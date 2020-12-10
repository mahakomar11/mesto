import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitter) {
    super(popupSelector);
    this._formSubmitter = formSubmitter;
    this._inputs = this.popup.querySelectorAll(".popup__input");
    this._inputValues = {};
    this.submitButton = this.popup.querySelector(".popup__submit-button");
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
    this.submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        this._formSubmitter(this._getInputValues());
      });
  }

  close() {
    super.close();
    this._inputs.forEach((input) => {
      input.value = "";
    });
  }
}
