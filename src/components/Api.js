export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._userUrl = `${this._baseUrl}/users/me`;
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка ${response.status}`);
      }
    });
  }

  getUserInfo() {
    return fetch(this._userUrl, {
      headers: this._headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка ${response.status}`);
      }
    });
  }
}
