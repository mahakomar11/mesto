let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input_content_name');
let inputJob = document.querySelector('.popup__input_content_job');

let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function clickOnEdit() {
  togglePopup();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function clickOnBackground(event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
}

function submitForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  togglePopup();
}

editButton.addEventListener('click', clickOnEdit);
closeButton.addEventListener('click', togglePopup);
popup.addEventListener('click', clickOnBackground);
form.addEventListener('submit', submitForm);