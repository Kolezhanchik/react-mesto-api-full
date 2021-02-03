import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile" id="profile">
        <div className="profile__overlay">
          <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
          <button className="profile__edit-avatar" onClick={props.onEditAvatar}>
            &#128393;
              </button>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__role">{currentUser.about}</p>
          </div>
          <button className="profile__edit-info" onClick={props.onEditProfile}>
            &#128393;
              </button>
        </div>
        <button className="profile__add" onClick={props.onAddPlace}>
          &#65291;
            </button>
      </section>
      <section className="locations">
        {props.isCardsLoading ? (
          <p className="locations__loading">Загрузка...</p>)
          : props.cards.map(card =>
          (<Card
            key={card._id}
            card={card}
            onImgClick={props.onImgClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />)
          )}
      </section>
    </main>
  );
}

export default Main;