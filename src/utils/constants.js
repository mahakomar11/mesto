const selectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorSelector: ".popup__error",
};

const templateSelector = "#place";
const buttonAdd = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonEditAvatar = document.querySelector(".profile__edit-avatar-button");

export { selectors, templateSelector, buttonAdd, buttonEditProfile, buttonEditAvatar};