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

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
  headers: {
    authorization: "315ad660-d92f-49d2-a7f7-3bcfa435f3a6",
    "Content-type": "application/json",
  },
});

// Info in profile
const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__job",
  avatar: ".profile__avatar",
});

api.getUserInfo().then((data) => {
  userInfo.setUserInfo({ name: data.name, job: data.about });
  userInfo.setUserAvatar(data.avatar);
  userInfo.id = data._id;
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
          isLiked: checkIfLiked(item.likes, userInfo.id),
          isMine: checkIfMine(item.owner, userInfo.id),
        },
        false
      );
    });
  })
  .catch((err) => alert(err));

const checkIfLiked = (likesArray, userId) => {
  var isLiked = false;
  likesArray.forEach((user) => {
    if (user._id == userId) {
      isLiked = true;
      return;
    }
  });
  return isLiked;
};

const checkIfMine = (owner, userId) => {
  return owner._id == userId;
}

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
      isMine: cardData.isMine,
      handleCardClick: handleCardClick,
      handleDeleteClick: handleDeleteClick,
      handleLike: handleLike,
    },
    templateSelector
  );
  const cardElement = card.generateCard();
  sectionCards.addItem(cardElement, (inTheBegining = inTheBegining));
  if (inTheBegining) {
    console.log(card);
  }
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

const submitAddCard = (inputValues) => {
  api
    .addCard({ name: inputValues.title, link: inputValues.link })
    .then((data) => {
      renderCard(
        {
          title: data.name,
          link: data.link,
          countLikes: data.likes.length,
          id: data._id,
          isLiked: false,
          isMine: true,
        },
        true
      );
    });
};

const submitDeleteCard = (card) => {
  api.deleteCard(card.id).then();
  card.deleteCard();
}

// Popups
const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  submitEditProfile
);
const popupEditAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  submitEditAvatar
);
const popupAddCard = new PopupWithForm(".popup_type_add-card", submitAddCard);
const popupDeleteCard = new PopupWithForm(".popup_type_delete-card", submitDeleteCard);
const popupShowCard = new PopupWithImage(".popup_type_show-card");

// Set listeners to popups
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupShowCard.setEventListeners();

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
