export default class FormValidator {
  constructor(selectors, formElement) {
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorSelector = selectors.errorSelector;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._isFormValid = null;
    this._inputElementsArray = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _setSubmitButtonAbility() {
    if (this._isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled", true);
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
    }
  }

  resetErrors() {
    this._formElement.querySelectorAll(this._inputSelector).forEach((input) => {
      this._hideError(input);
    });
    this._checkValidityForSubmit();
  }

  _setEventListeners() {
    this._inputElementsArray.forEach((inputElement) =>
      inputElement.addEventListener("input", () =>
        this._checkValidity(inputElement)
      )
    );
    this._formElement.addEventListener("input", () =>
      this._checkValidityForSubmit()
    );
  }

  _showError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._formElement.querySelector(`#${inputElement.id}-error`).textContent =
      inputElement.validationMessage;
  }

  _hideError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._formElement.querySelector(`#${inputElement.id}-error`).textContent = "";
  }

  _checkValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  _checkValidityForSubmit() {
    this._isFormValid = !this._inputElementsArray.some(
      (inputElement) => !inputElement.validity.valid
    );
    this._setSubmitButtonAbility();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
