import React from 'react';

function InfoTooltip(props) {

    return (
        <div onClick={props.onClick} className={`popup ${props.isOpen && 'popup_opened'}`}>
                <div className="popup__container popup__container_tooltip">
                    <button onClick={props.onClose} type="button" className="popup__close popup__close_image">&#9587;</button>
                    <span className={`popup__info popup__info_${props.type}`}></span>
                    <h2 className="popup__title popup__title_center">{props.message}</h2>
                </div>
          

        </div>
    )
}

export default InfoTooltip;