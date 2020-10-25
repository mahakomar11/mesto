const checkValidity = (inputElement, errorElement) => {
  if (!inputElement.validity.valid) {
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = inputElement.validationMessage;
  }
  else {
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
  }
}

const checkValidityForSubmit = (inputElementsArray, submitButton) => {
  if (inputElementsArray.some(inputElement => !inputElement.validity.valid)) {
    submitButton.classList.add('popup__submit-button_disabled');
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove('popup__submit-button_disabled');
    submitButton.removeAttribute('disabled', true);
  }
}

const setEventListeners = (formElement) => {
  const inputElementsArray = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButton = formElement.querySelector('.popup__submit-button');

  inputElementsArray.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      checkValidity(inputElement, errorElement);
    });
  });
  formElement.addEventListener('input', () => checkValidityForSubmit(inputElementsArray, submitButton));
}

const enableValidation = () => {
  const formElementsArray = Array.from(document.forms);
  formElementsArray.forEach(formElement => setEventListeners(formElement));
}

enableValidation();