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
const cardsGrid = document.querySelector('.places__grid');
const cardTemplate = document.querySelector("#place").content;
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

const toggleLike = (event) => {
  const buttonLike = event.target;
  buttonLike.classList.toggle('place__icon-like_active');
}

const createCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.place__photo');
  const cardTitle = cardElement.querySelector('.place__title');
  const cardButtonLike = cardElement.querySelector('.place__icon-like');
  const cardButtonDelete = cardElement.querySelector('.place__icon-delete');

  cardPhoto.src = cardData.link;
  cardPhoto.alt = 'Фото, ' + cardData.name;
  cardTitle.textContent = cardData.name;

  cardPhoto.addEventListener('click', () => openPopupShowCard(cardData));
  cardButtonLike.addEventListener('click', toggleLike);
  cardButtonDelete.addEventListener('click', deleteCard);
  return cardElement;
}

const addCard = (cardData, inStart = true) => {
  const cardElement = createCard(cardData);

  if (inStart) cardsGrid.prepend(cardElement)
  else cardsGrid.append(cardElement);
}

const deleteCard = (event) => {
  const buttonDelete = event.target;
  cardElement = buttonDelete.closest('.place');
  cardElement.remove();
}


const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

const openPopup = (popup) => {
  togglePopup(popup);
  document.addEventListener('keydown', closePopupByEsc);
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
  openPopup(popupEditProfile);
}

const submitPopupEditProfile = (event) => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  submitPopup(event, popupEditProfile);
}

const openPopupShowCard = (cardData) => {
  popupPhoto.src = cardData.link;
  popupPhoto.alt = 'Фото, ' + cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupShowCard);
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

inputName.value = profileName.textContent;
inputJob.value = profileJob.textContent;
// Add initial cards to grid
initialCards.forEach(cardData => addCard(cardData, false));
// Add listeners to buttons that open popups
buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', () => openPopup(popupAddCard));
// Add listeners to popups for closing
popups.forEach(popup => popup.addEventListener('click', closePopupByClick));
// Add listeners to buttons that submit popups
buttonSubmitProfile.addEventListener('click', submitPopupEditProfile);
buttonSubmitCard.addEventListener('click', submitPopupAddCard);