export default class UserInfo {
  constructor(selectors) {
    this._nameElement = document.querySelector(selectors.name);
    this._infoElement = document.querySelector(selectors.job);
    this._avatarElement = document.querySelector(selectors.avatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._infoElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._infoElement.textContent = userData.job;
  }

  setUserAvatar(link) {
    this._avatarElement.src = link
  }
}
