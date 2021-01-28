import React from 'react';
import PopupWithForm from './PopupWithForm';


function DeleteCardPopup(props) {

    return (
        <PopupWithForm
            name="cardDel"
            title="Вы уверены?"
            btnText={props.isCardDeleting ? "Удаление..." : "Да"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={props.handleSubmit}
            onClick = {props.onClick}
        >
        </PopupWithForm>
    )
}

export default DeleteCardPopup;