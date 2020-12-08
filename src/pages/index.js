import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  selectors,
  templateSelector,
  buttonAdd,
  buttonEditProfile,
  buttonEditAvatar
} from "../utils/constants.js";
import "./index.css";

// Cards functions
const handleCardClick = (card) => {
  popupShowCard.open({
    src: card.photoSrc,
    alt: card.photoAlt,
    caption: card.name,
  });
};

const handleDeleteClick = () => {
  popupDeleteCard.open();
};

const renderCard = (cardData, inTheBegining) => {
  const card = new Card(
    {
      name: cardData.title,
      link: cardData.link,
      handleCardClick: handleCardClick,
      handleDeleteClick: handleDeleteClick,
    },
    templateSelector
  );
  const cardElement = card.generateCard();
  sectionCards.addItem(cardElement, (inTheBegining = inTheBegining));
};

// Render initial cards
const sectionCards = new Section(
  {
    items: initialCards,
    renderer: (cardData) => renderCard(cardData, false),
  },
  ".places__grid"
);
sectionCards.renderItems();

// Submitters
const submitEditProfile = (inputValues) => {
  userInfo.setUserInfo(inputValues);
};

// Popups
const popupShowCard = new PopupWithImage(".popup_type_show-card");
const popupAddCard = new PopupWithForm(".popup_type_add-card", (inputValues) =>
  renderCard(inputValues, true)
);
const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  submitEditProfile
);
const popupDeleteCard = new PopupWithForm(".popup_type_delete-card", () => {});
const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", (inputValues) => {
  document.querySelector(".profile__avatar").src = inputValues.link;
  console.log(inputValues.link);
});
// Set listeners to popups
popupShowCard.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();
// Forms validators
const validatorEditProfile = new FormValidator(
  selectors,
  popupEditProfile.popup.querySelector("form")
);
const validatorAddCard = new FormValidator(
  selectors,
  popupAddCard.popup.querySelector("form")
);
const validatorEditAvatar = new FormValidator(
  selectors,
  popupEditAvatar.popup.querySelector("form")
)
// Enable validation
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();
// Info in profile
const userInfo = new UserInfo({ name: ".profile__name", job: ".profile__job" });
// Set listeners to buttons that open popups
buttonAdd.addEventListener("click", () => {
  validatorAddCard.resetErrors();
  popupAddCard.open();
});
buttonEditProfile.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  validatorEditProfile.resetErrors();
  popupEditProfile.open();
});
buttonEditAvatar.addEventListener("click", () => {
  validatorEditAvatar.resetErrors();
  popupEditAvatar.open();
})



// const renderCard = (cardData) => {
//   const card = new Card(
//     {
//       name: cardData.name,
//       link: cardData.link,
//       handleCardClick: handleCardClick,
//     },
//     templateSelector
//   );
//   const cardElement = card.generateCard();
//   cardsGrid.append(cardElement);
// };


