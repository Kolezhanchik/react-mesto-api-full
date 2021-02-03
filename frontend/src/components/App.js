import React, { useEffect, useState, useCallback } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';



function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isCardPopupOpen, setCardSPopupState] = useState(false);
  const [isDelCardPopupOpen, setIsDelCardPopupOpen] = useState(false);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [isUserSaving, setIsUserSaving] = useState(false);
  const [isCardDeleting, setIsCardDeleting] = useState(false);
  const [isPlaceAdding, setIsPlaceAdding] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDel, setCardToDel] = useState({});
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipType, setTooltipType] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(loggedIn && jwt){
    setIsCardsLoading(true);
    api.getInitialData(jwt)
      .then(([user, cards]) => {        
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((error) => { alert(error) })
      .finally(() => {
        setIsCardsLoading(false);
        history.push('/');
      });
    }
  }, [loggedIn, history]);

  const getUser = useCallback(() => {
    const jwt = localStorage.getItem('jwt');      
    if(loggedIn && jwt){   
    api.getInitialProfile(jwt)
      .then((data) => {
        setCurrentUser(data);       
      })
      .catch((error) => { alert(error) });
    }
  },
    [loggedIn, setCurrentUser]
  )

 // popup closing by ESC
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  // popup closing by overlay
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupState(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupState(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setCardSPopupState(!isCardPopupOpen);
    setSelectedCard(card);
  }

  function handleCardDeleteReq(card) {
    setCardToDel(card);
    setIsDelCardPopupOpen(!isDelCardPopupOpen);
  }

  function handleTooltipOpen() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
  }

  function closeAllPopups() {
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setCardSPopupState(false);
    setIsDelCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    const jwt = localStorage.getItem('jwt');    
    setIsUserSaving(true);
    api.setProfile(data, jwt)
      .then(() => {
          closeAllPopups();
        })
      .catch((error) => { alert(error) })
      .finally(() => {
        setIsUserSaving(false);
      });
      getUser();
  }

    function handleUpdateAvatar(data) {
    const jwt = localStorage.getItem('jwt');
    api.setProfileAvatar(data, jwt)
      .then(() => {
          closeAllPopups();
        })
      .catch((error) => { alert(error) });
      getUser();
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem('jwt');    
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => { alert(error) });
  }

  function handleAddPlaceSubmit(data) {
    const jwt = localStorage.getItem('jwt');
    setIsPlaceAdding(true);
    api.addCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => { alert(error) })
      .finally(() => {
        setIsPlaceAdding(false);
      });
  }

  function handleCardDelete(event) {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt');
    setIsCardDeleting(true);
    api.delCard(cardToDel._id, jwt)
      .then(() => {
        const newCards = cards.filter((c) => c !== cardToDel);
        setCards(newCards);
        setIsDelCardPopupOpen(false);
      })
      .catch((error) => { alert(error) })
      .finally(() => {
        setIsCardDeleting(false);
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  const handleTokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
     if (jwt) {     
      if (loggedIn && jwt) {
        auth.checkToken(jwt)
          .then((res) => {
            if (res) {
              setCurrentUserEmail(res.email);
              console.log(jwt, res.email);
              setLoggedIn(true);
              history.push('/');
            }
          })
      }
    }
  },
    [history, setLoggedIn, loggedIn, setCurrentUserEmail]
  )
  
  useEffect(() => {
    function handleRefresh() {
      handleTokenCheck();
      setLoggedIn(true);
    }
    window.addEventListener("DOMContentLoaded", handleRefresh);
    return () => window.removeEventListener("DOMContentLoaded", handleRefresh);
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('jwt');    
    if (token) {
      handleTokenCheck();
    }
  }, [handleTokenCheck]);

  function handleLogin(values) {
    if (!values.email || !values.password) {
      return;
    }
    auth.authorize(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  function handleRegister(values, resetForm) {
    auth.register(values)
      .then((res) => {
        if (res) {
          handleTooltipOpen();
          setTooltipMessage('Вы успешно зарегистрировались!');
          setTooltipType('positive');
          history.push('/sign-in');
          resetForm();
        }
        else {
          setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
          setTooltipType('negative');
          handleTooltipOpen();
        }
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <Header
        loggedIn={loggedIn}
        logOut={handleLogOut}
        userEmail={currentUserEmail}
      />
      <Switch>
        <Route path="/sign-up">
          <Register
            onTooltipOpen={handleTooltipOpen}
            message={setTooltipMessage}
            type={setTooltipType}
            handleRegister={handleRegister}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            handleLogin={handleLogin}
          />
        </Route>
        <ProtectedRoute
          path="/"
          component={Main}
          currentUser = {currentUser}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImgClick={handleCardClick}
          isCardsLoading={isCardsLoading}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteReq}
          cards={cards}
        />
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onClick={handleOverlayClick}
        isUserSaving={isUserSaving}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onClick={handleOverlayClick}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onClick={handleOverlayClick}
        isPlaceAdding={isPlaceAdding}
      />
      <DeleteCardPopup
        isOpen={isDelCardPopupOpen}
        onClose={closeAllPopups}
        handleSubmit={handleCardDelete}
        onClick={handleOverlayClick}
        isCardDeleting={isCardDeleting}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isCardPopupOpen}
        onClose={closeAllPopups}
        onClick={handleOverlayClick}
      />
      <InfoTooltip
        type={tooltipType}
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        onClick={handleOverlayClick}
        message={tooltipMessage}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;

