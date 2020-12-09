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

  patchUserInfo(info) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: info.name, about: info.about})
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка ${response.status}`);
      }
    });
  }

  patchUserAvatar(link) {
    const avaUrl = `${this._userUrl}/avatar`;
    return fetch(avaUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link})
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка ${response.status}`);
      }
    });
  }

  // putLike(cardId) {
  //   return fetch(`${this._cardsUrl}/likes/${cardId}`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   }).then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       return Promise.reject(`Ошибка ${response.status}`);
  //     }
  //   });
  // }

  handleLike(cardId, method) {
    return fetch(`${this._cardsUrl}/likes/${cardId}`, {
      method: method,
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
