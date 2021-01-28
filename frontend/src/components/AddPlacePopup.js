import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useCustomFormAndValidation } from '../hooks/useCustomForm';

function AddPlacePopup(props) {
    const { values, handleChange, errors, isValid, resetForm } = useCustomFormAndValidation();

    useEffect(() => {
        resetForm()
    }, [props.isOpen, resetForm])

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(values);
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            btnText={props.isPlaceAdding ? "Создается..." : "Создать"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isDisabled={!isValid}
            onClick={props.onClick}
        >
            <>
                <input
                    type="text"
                    id="location-name-input"
                    name="name"
                    placeholder="Название"
                    required
                    minLength="1"
                    maxLength="30"
                    className="popup__text popup__text_type_location-name"
                    value={values.name || ''}
                    onChange={handleChange}
                />
                <span id="location-name-input-error"
                    className="popup__text-error">{errors.name || ''}</span>
                <input
                    type="url"
                    id="location-ref-input"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required
                    className="popup__text popup__text_type_ref"
                    value={values.link || ''}
                    onChange={handleChange}
                />
                <span id="location-ref-input-error" className="popup__text-error">{errors.link || ''}</span>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;