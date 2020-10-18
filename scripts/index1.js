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

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

const closePopup = (event) => {
  const buttonClose = event.target;
  const popup = buttonClose.closest('.popup');
  togglePopup(popup);
}

buttonsClose.forEach(button => button.addEventListener('click', closePopup));

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_content_name');
const inputJob = document.querySelector('.popup__input_content_job');

const openPopupEditProfile = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  togglePopup(popupEditProfile);
}

buttonEdit.addEventListener('click', openPopupEditProfile);


const buttonSubmitProfile = popupEditProfile.querySelector('.popup__submit-button');

const submitPopupEditProfile = (event) => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  togglePopup(popupEditProfile);
  event.preventDefault();
}

buttonSubmitProfile.addEventListener('click', submitPopupEditProfile);


const gridCards = document.querySelector('.places__grid');
const cardTemplate = document.querySelector("#place").content;

const toggleLike = (event) => {
  const buttonLike = event.target;
  buttonLike.classList.toggle('place__icon-like_active');
}

const deleteCard = (event) => {
  const buttonDelete = event.target;
  cardElement = buttonDelete.closest('.place');
  cardElement.remove();
}

const popupShowCard = document.querySelector('.popup_type_show-card');

const openPopupShowCard = (event) => {
  const cardPhoto = event.target;
  const cardTitle = cardPhoto.closest('.place').querySelector('.place__title');
  const popupPhoto = popupShowCard.querySelector('.popup__photo');
  const popupCaption = popupShowCard.querySelector('.popup__caption');

  popupPhoto.src = cardPhoto.style.backgroundImage.split('url("')[1].slice(0, -2);
  popupCaption.textContent = cardTitle.textContent;
  togglePopup(popupShowCard);
}


const addCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.place__photo');
  const cardTitle = cardElement.querySelector('.place__title');

  cardPhoto.style.backgroundImage = `url(${cardData.link})`;
  cardTitle.textContent = cardData.name;

  cardPhoto.addEventListener('click', openPopupShowCard);
  const cardButtonLike = cardElement.querySelector('.place__icon-like');
  cardButtonLike.addEventListener('click', toggleLike);

  const cardButtonDelete = cardElement.querySelector('.place__icon-delete');
  cardButtonDelete.addEventListener('click', deleteCard);

  gridCards.append(cardElement);
}

initialCards.forEach(cardData => addCard(cardData));


