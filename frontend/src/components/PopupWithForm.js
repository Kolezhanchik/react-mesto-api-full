import React from 'react';

function PopupWithForm(props) {

    return (
        <div onClick={props.onClick} className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <form
                name={props.name}
                noValidate
                className={`popup__container popup__form popup__container_type_${props.name}`}
                onSubmit={props.onSubmit}
            >
                <button
                    onClick={props.onClose}
                    type="button"
                    className={`popup__close popup__close_profile-${props.name}`}>&#9587;</button>
                <h2 className="popup__title">
                    {props.title}
                </h2>
                {props.children}
                <button type="submit" className={`popup__btn popup__btn_type_${props.name} ${props.isDisabled && 'popup__btn_disabled'}`} >{props.btnText}</button>
            </form>
        </div>
    )
}

export default PopupWithForm;