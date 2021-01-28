import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useCustomFormAndValidation } from '../hooks/useCustomForm';

function EditAvatarPopup(props) {

    const { values, handleChange, errors, isValid, resetForm } = useCustomFormAndValidation();

    useEffect(() => {
        resetForm();
    }, [props.isOpen, resetForm])

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar(values);
    }

    return (
        <PopupWithForm
            name="renew"
            title="Обновить аватар"
            btnText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isDisabled={!isValid}
            onClick={props.onClick}
        >
            <>
                <input
                    type="url"
                    id="avatar-ref-input"
                    name="avatar"
                    placeholder="Ссылка на новый аватар"
                    required
                    className="popup__text popup__text_type_ref"
                    value={values.avatar || ''}
                    onChange={handleChange}
                />
                <span id="avatar-ref-input-error" className="popup__text-error">{errors.avatar || ''}</span>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;