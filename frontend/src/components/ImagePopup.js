import React from 'react';

function ImagePopup(props) {
// popup_type_${props.name} 
    return (
        <div onClick = {props.onClick} className={`popup ${props.isOpen && props.card && 'popup_opened'}`}>
            <div className="popup__container popup__container_image">
                <button onClick={props.onClose} type="button" className="popup__close popup__close_image">&#9587;</button>
                <img src={String(props.card.link)} alt={`Фото ${props.card.name}`} className="popup__image" />
                <p className="popup__caption">{props.card.name}</p>
            </div>
        </div>
    )

}

export default ImagePopup;