import {setSubmitButtonAbility} from './index.js';

class FormValidator {
  constructor(selectors, formElement) {
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorSelector = selectors.errorSelector;
    this._formElement = formElement;
  }

  _setEventListeners() {
    this._inputElementsArray = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  
    this._inputElementsArray.forEach(inputElement => 
      inputElement.addEventListener('input', () => 
      this._checkValidity(inputElement)
      )
    );
    this._formElement.addEventListener('input', () => this._checkValidityForSubmit());
  }

  _checkValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
    }
  }

  _checkValidityForSubmit() {
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._isFormValid = !this._inputElementsArray.some(inputElement => !inputElement.validity.valid);
    setSubmitButtonAbility(this._submitButton, this._inactiveButtonClass, this._isFormValid);
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export {FormValidator};

