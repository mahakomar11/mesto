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

const gridCards = document.querySelector('.places__grid');
const cardTemplate = document.querySelector("#place").content;

const toggleLike = (event) => {
  buttonLike = event.target;
  buttonLike.classList.toggle('place__icon-like_active');
}
const addCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.place__photo');
  const cardTitle = cardElement.querySelector('.place__title');

  cardPhoto.style.backgroundImage = `url(${cardData.link})`;
  cardTitle.textContent = cardData.name;

  const cardButtonLike = cardElement.querySelector('.place__icon-like');
  cardButtonLike.addEventListener('click', toggleLike);

  gridCards.append(cardElement);
}

initialCards.forEach(cardData => addCard(cardData));