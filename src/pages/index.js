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

// API
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

// Get initial cards and user info
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    userInfo.setUserAvatar(userData.avatar);
    userInfo.id = userData._id;
    cardsData.forEach((item) => {
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

// Utils for card data
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

const handleLikeClick = (card) => {
  const method = card.isLiked ? "DELETE" : "PUT";
  api.handleLikeClick(card.id, method)
    .then((data) => {
      card.countLikes = data.likes.length;
      card.toggleLike();
    })
    .catch((err) => alert(err));
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
      handleLikeClick: handleLikeClick,
    },
    templateSelector
  );
  const cardElement = card.generateCard();
  sectionCards.addItem(cardElement, (inTheBegining = inTheBegining));
};

// Submitters
const submitEditProfile = (inputValues) => {
  popupEditProfile.submitButton.textContent = "Сохранение...";
  api
    .patchUserInfo({
      name: inputValues.name,
      about: inputValues.job,
    })
    .then(() => {
      userInfo.setUserInfo(inputValues);
      popupEditProfile.close();
    })
    .catch((err) => alert(err))
    .finally(() => popupEditProfile.submitButton.textContent = "Сохранить");
};

const submitEditAvatar = (inputValues) => {
  popupEditAvatar.submitButton.textContent = "Сохранение...";
  api.patchUserAvatar(inputValues.link)
    .then(() => {
      userInfo.setUserAvatar(inputValues.link);
      popupEditAvatar.close();
    })
    .catch((err) => alert(err))
    .finally(() => popupEditAvatar.submitButton.textContent = "Сохранить");
};

const submitAddCard = (inputValues) => {
  popupAddCard.submitButton.textContent = "Сохранение...";
  api.addCard({ name: inputValues.title, link: inputValues.link })
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
      popupAddCard.close();
    })
    .catch((err) => alert(err))
    .finally(() => popupAddCard.submitButton.textContent = "Создать");
};

const submitDeleteCard = (card) => {
  popupDeleteCard.submitButton.textContent = "Удаление..."
  api.deleteCard(card.id)
    .then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => alert(err))
    .finally(() => popupDeleteCard.submitButton.textContent = "Да");
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
