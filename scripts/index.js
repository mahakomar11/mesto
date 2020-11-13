import { Card } from "./Card.js";
import {FormValidator} from "./FormValidator.js";
 
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const selectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error'
}

const cardsGrid = document.querySelector('.places__grid');
const templateSelector = "#place";
// Buttons that open popups
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
// Popup for editing profile and it's variables
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = popupEditProfile.querySelector('.popup__input_content_name');
const inputJob = popupEditProfile.querySelector('.popup__input_content_job');
const buttonSubmitProfile = popupEditProfile.querySelector('.popup__submit-button');
// Popup for adding new card and it's variables
const popupAddCard = document.querySelector('.popup_type_add-card');
const inputTitle = popupAddCard.querySelector('.popup__input_content_title');
const inputLink = popupAddCard.querySelector('.popup__input_content_link');
const buttonSubmitCard = popupAddCard.querySelector('.popup__submit-button');
// Popup for opening a card and it's variables
const popupShowCard = document.querySelector('.popup_type_show-card');
const popupPhoto = popupShowCard.querySelector('.popup__photo');
const popupCaption = popupShowCard.querySelector('.popup__caption');
// Array with all popups
const popups = document.querySelectorAll('.popup');
// Array with all forms
const formElementsArray = Array.from(document.forms);

const addCard = (cardData, inStart = true) => {
  const card = new Card(cardData, templateSelector)
  const cardElement = card.generateCard();

  if (inStart) cardsGrid.prepend(cardElement)
  else cardsGrid.append(cardElement);
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

const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

const openPopup = (popup) => {
  togglePopup(popup);
  document.addEventListener('keydown', closePopupByEsc);
}

const resetInputs = (popup) => {
  const inputsArray = Array.from(popup.querySelectorAll(selectors.inputSelector));
  const errorsArray = Array.from(popup.querySelectorAll(selectors.errorSelector));
  
  inputsArray.forEach(input => {
    input.value = '';
    input.classList.remove(selectors.inputErrorClass);
  })
  errorsArray.forEach(error => error.textContent = '');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupByEsc);
  togglePopup(popup);
  resetInputs(popup);
}

const closePopupByClick = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
    closePopup(event.currentTarget);
  };
}

const closePopupByEsc = (event) => {
  const popup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popup);
  };
}

const submitPopup = (event, popup) => {
  event.preventDefault();
  togglePopup(popup);
}

const openPopupEditProfile = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  setSubmitButtonAbility(buttonSubmitProfile, selectors.inactiveButtonClass, true);
  openPopup(popupEditProfile);
}

const submitPopupEditProfile = (event) => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  submitPopup(event, popupEditProfile);
}

const openPopupAddCard = () => {
  setSubmitButtonAbility(buttonSubmitCard, selectors.inactiveButtonClass, false);
  openPopup(popupAddCard)
}

const submitPopupAddCard = (event) => {
  const cardData = {
    name: inputTitle.value,
    link: inputLink.value,
  }
  addCard(cardData);
  submitPopup(event, popupAddCard);
  inputTitle.value = '';
  inputLink.value = '';
}

const openPopupShowCard = (card) => {
  popupPhoto.src = card.photoSrc;
  popupPhoto.alt = card.photoAlt;
  popupCaption.textContent = card.name;
  openPopup(popupShowCard);
}

// Add initial cards to grid
initialCards.forEach(cardData => addCard(cardData, false));
// Add listeners to buttons that open popups
buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', openPopupAddCard);
// Add listeners to popups for closing
popups.forEach(popup => popup.addEventListener('click', closePopupByClick));
// Add listeners to buttons that submit popups
buttonSubmitProfile.addEventListener('click', submitPopupEditProfile);
buttonSubmitCard.addEventListener('click', submitPopupAddCard);
// Enable validation for all forms
formElementsArray.forEach(formElement => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
});

export {openPopupShowCard, setSubmitButtonAbility};


