import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  selectors,
  templateSelector,
  buttonAdd,
  buttonEditProfile,
  buttonEditAvatar,
} from "../utils/constants.js";
import "./index.css";
import Api from "../components/Api.js";

// Info in profile
const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__job",
  avatar: ".profile__avatar",
});

// Section with cards
const sectionCards = new Section(
  {
    items: [],
    renderer: (cardData) => renderCard(cardData, false),
  },
  ".places__grid"
);

// Cards functions
const handleCardClick = (card) => {
  popupShowCard.open({
    src: card.photoSrc,
    alt: card.photoAlt,
    caption: card.name,
  });
};

const handleDeleteClick = (card) => {
  popupDeleteCard.open();
  popupDeleteCard.setInputValues(card);
};

const handleLike = (card) => {
  const method = card.isLiked ? "DELETE" : "PUT";
  api.handleLike(card.id, method).then((data) => {
    card.countLikes = data.likes.length;
    card._toggleLike();
  });
};

const renderCard = (cardData, inTheBegining) => {
  const card = new Card(
    {
      name: cardData.title,
      link: cardData.link,
      countLikes: cardData.countLikes,
      id: cardData.id,
      isLiked: cardData.isLiked,
      handleCardClick: handleCardClick,
      handleDeleteClick: handleDeleteClick,
      handleLike: handleLike,
    },
    templateSelector
  );
  const cardElement = card.generateCard();
  sectionCards.addItem(cardElement, (inTheBegining = inTheBegining));
};

// Submitters
const submitEditProfile = (inputValues) => {
  userInfo.setUserInfo(inputValues);
  api
    .patchUserInfo({
      name: inputValues.name,
      about: inputValues.job,
    })
    .catch((err) => alert(err));
};

const submitEditAvatar = (inputValues) => {
  userInfo.setUserAvatar(inputValues.link);
  api.patchUserAvatar(inputValues.link).catch((err) => alert(err));
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
const popupDeleteCard = new PopupWithForm(".popup_type_delete-card", (card) => {
  card.deleteCard();
});
const popupEditAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  submitEditAvatar
);
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
);
// Enable validation
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();

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
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
  headers: {
    authorization: "315ad660-d92f-49d2-a7f7-3bcfa435f3a6",
    "Content-type": "application/json",
  },
});

api
  .getInitialCards()
  .then((data) => {
    data.forEach((item) => {
      renderCard(
        {
          title: item.name,
          link: item.link,
          countLikes: item.likes.length,
          id: item._id,
          isLiked: getIsLiked(item.likes, userInfo.id),
        },
        false
      );
    });
  })
  .catch((err) => alert(err));

api.getUserInfo().then((data) => {
  userInfo.setUserInfo({ name: data.name, job: data.about });
  userInfo.setUserAvatar(data.avatar);
  userInfo.id = data._id;
});

const getIsLiked = (likesArray, userId) => {
  var isLiked = false;
  likesArray.forEach((user) => {
    if (user._id == userId) {
      isLiked = true;
      return;
    }
  });
  return isLiked;
};
