import React, { useState, useEffect } from 'react';
import headerLogo from '../images/white-logo.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header(props) {
  let location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`header ${props.loggedIn && windowWidth < 540 ? "header__loggedin-mob" : ""}`}>
      <div className="header__wrap header__wrap_logo">
        <img src={headerLogo} className="header__logo" alt="Логотип" />
        {props.loggedIn && (isMenuOpen ? (<button onClick={handleClick} className='header__menu header__menu_bar'>&#9776;</button>) :
         ( <button onClick={handleClick} className='header__menu header__menu_close'>&#9587;</button>))}
      </div>
      <div className={`header__wrap ${props.loggedIn && windowWidth < 540 ? "header__wrap_loggedin-mob" : ""} header__wrap_email 
      ${props.loggedIn && windowWidth < 540 && (!isMenuOpen ? "" : "header__wrap_hide")}`} >
        {props.loggedIn && (<p className="header__email">{props.userEmail}</p>)}
        {!props.loggedIn && location.pathname === "/signup" &&
          (<Link to="/signin" className="header__link">Войти</Link>)
        }
        {!props.loggedIn && location.pathname === "/signin" &&
          (<Link to="/signup" className="header__link">Регистрация</Link>)
        }
        {props.loggedIn &&
         ( <Link to="/signin" onClick={props.logOut} className="header__link">Выйти</Link>)
        }
      </div>
    </header>
  )
}

export default Header;