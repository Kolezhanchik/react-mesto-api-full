class Api {
  constructor({ url }) {
    this._url = url;
  }

  _responseHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error happen: ${res.status}`);
  }

  getInitialData(jwt) {
    return Promise.all([this.getInitialProfile(jwt), this.getInitialCards(jwt)]);
  }

  getInitialCards(jwt) {
    return fetch(`${this._url}cards`, {      
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    })
      .then(this._responseHandler);
  }

  getInitialProfile(jwt) {
       return fetch(`${this._url}users/me`, {
       headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    })
      .then(this._responseHandler);
  }

  addCard(data, jwt) {    
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
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
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
    })
      .then((this._responseHandler));
  }

  changeLikeCardStatus(id, isLiked, jwt) {    
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._url}cards/${id}/likes`, {
      method,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
    })
      .then(this._responseHandler);
  }

  setProfile(profile, jwt) {
    
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
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
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: obj.avatar,
      }),
    })
      .then(this._responseHandler);
  }

}
// const api = new Api({
// url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
// url: 'http://api.kolenhen.students.nomoredomains.icu/',
// url: 'http://localhost:3000/',
//  headers: {
//    uthorization: 'cbe4503b-5ebe-4451-a159-203687412eb7',
//   'Content-Type': 'application/json',
// },
// });
export default new Api({
  url: 'http://api.kolenhen.students.nomoredomains.icu/',
});
