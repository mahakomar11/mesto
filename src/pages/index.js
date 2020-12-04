import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  selectors,
  cardsGrid,
  templateSelector,
  buttonAdd,
  buttonEdit,
} from "../utils/constants.js";
import "./index.css";

// Submitters
const submitEditProfile = (inputValues) => {
  userInfo.setUserInfo(inputValues);
};

const submitAddCard = (inputValues) => {
  const card = new Card(
    {
      name: inputValues.title,
      link: inputValues.link,
      handleCardClick: handleCardClick,
    },
    templateSelector
  );
  const cardElement = card.generateCard();
  cardsGrid.prepend(cardElement);
};

// Popups
const popupShowCard = new PopupWithImage(".popup_type_show-card");
const popupAddCard = new PopupWithForm(".popup_type_add-card", submitAddCard);
const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  submitEditProfile
);
// Set listeners to popups
popupShowCard.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
// Forms validators
const validatorEditProfile = new FormValidator(
  selectors,
  popupEditProfile.popup.querySelector("form")
);
const validatorAddCard = new FormValidator(
  selectors,
  popupAddCard.popup.querySelector("form")
);
// Enable validation
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
// Info in profile
const userInfo = new UserInfo({ name: ".profile__name", job: ".profile__job" });
// Set listeners to buttons that open popups
buttonAdd.addEventListener("click", () => {
  validatorAddCard.resetErrors();
  popupAddCard.open();
});
buttonEdit.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  validatorEditProfile.resetErrors();
  popupEditProfile.open();
});

// Cards functions
const handleCardClick = (card) => {
  popupShowCard.open({
    src: card.photoSrc,
    alt: card.photoAlt,
    caption: card.name,
  });
};

const renderCard = (cardData) => {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      handleCardClick: handleCardClick,
    },
    templateSelector
  );
  const cardElement = card.generateCard();
  cardsGrid.append(cardElement);
};

// Render initial cards
const sectionCards = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".places__grid"
);
sectionCards.renderItems();
