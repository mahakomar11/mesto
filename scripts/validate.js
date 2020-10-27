// TODO: Зарефакторить, чтобы было красиво как в тренажёре
const checkValidity = (inputElement, errorElement, selectors) => {
  if (!inputElement.validity.valid) {
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  } else {
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = '';
  }
}

const setSubmitButtonAbility = (submitButton, inactiveButtonClass, isFormValid) => {
  if (isFormValid) {
    submitButton.classList.remove(selectors.inactiveButtonClass);
    submitButton.removeAttribute('disabled', true);
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }
}

const checkValidityForSubmit = (inputElementsArray, submitButton, selectors) => {
  const isFormValid = !inputElementsArray.some(inputElement => !inputElement.validity.valid);
  setSubmitButtonAbility(submitButton, selectors.inactiveButtonClass, isFormValid);
}

const setEventListeners = (formElement, selectors) => {
  const inputElementsArray = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const submitButton = formElement.querySelector(selectors.submitButtonSelector);

  inputElementsArray.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      checkValidity(inputElement, errorElement, selectors);
    });
  });
  formElement.addEventListener('input', () => checkValidityForSubmit(inputElementsArray, submitButton, selectors));
}

const enableValidation = (selectors) => {
  const formElementsArray = Array.from(document.forms);
  formElementsArray.forEach(formElement => setEventListeners(formElement, selectors));
}

const selectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(selectors);