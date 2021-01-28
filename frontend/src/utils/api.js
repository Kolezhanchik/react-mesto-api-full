class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _responseHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error happen: ${res.status}`);
  }

  getInitialData() {
    return Promise.all([this.getInitialProfile(), this.getInitialCards()]);
  }

  getInitialCards(jwt) {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._responseHandler);
  }

  getInitialProfile(jwt) {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._responseHandler);
  }

  addCard(data, jwt) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
      .then(this._responseHandler);
  }

  delCard(id, jwt) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then((this._responseHandler));
  }

  // addLike(id) {
  //   return fetch(`${this._url}cards/likes/${id}`, {
  //     method: 'PUT',
  //     headers: this._headers,
  //   })
  //   .then(this._responseHandler);
  // }

  // delLike(id, jwt) {
  //   return fetch(`${this._url}cards/likes/${id}`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   })
  //   .then(this._responseHandler);
  // }

  changeLikeCardStatus(id, isLiked, jwt) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._url}cards/likes/${id}`, {
      method,
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._responseHandler);
  }

  setProfile(profile, jwt) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profile.name,
        about: profile.about,
      }),
    }).then(this._responseHandler);
  }

  setProfileAvatar(obj, jwt) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: obj.avatar,
      }),
    })
      .then(this._responseHandler);
  }

}

const api = new Api({
  // url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
  url: 'http://api.kolenhen.students.nomoredomains.icu',
  //  headers: {
  //    uthorization: 'cbe4503b-5ebe-4451-a159-203687412eb7',
  //   'Content-Type': 'application/json',
  // },
});

export default api;