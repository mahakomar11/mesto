const checkValidity = (formElement, inputElement, submitButton) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    inputElement.classList.add('popup__input_type_error');
    submitButton.classList.add('popup__submit-button_disabled');
    submitButton.setAttribute('disabled', true);
    errorElement.textContent = inputElement.validationMessage;
  }
  else {
    inputElement.classList.remove('popup__input_type_error');
    submitButton.classList.remove('popup__submit-button_disabled');
    submitButton.removeAttribute('disabled', true);
    errorElement.textContent = '';
  }
}

const setEventListeners = (formElement) => {
  const inputElementsArray = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButton = formElement.querySelector('.popup__submit-button');

  inputElementsArray.forEach(inputElement => {
    inputElement.addEventListener('input', () => checkValidity(formElement, inputElement, submitButton))
  });
}

const enableValidation = () => {
  const formElementsArray = Array.from(document.forms);
  console.log(formElementsArray);
  formElementsArray.forEach(formElement => setEventListeners(formElement));
}

enableValidation();