import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useCustomFormAndValidation } from '../hooks/useCustomForm';

function EditProfilePopup(props) {

  const { values, handleChange, errors, isValid, resetForm } = useCustomFormAndValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText={props.isUserSaving ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      onClick={props.onClick}
    >
      <>
        <input
          type="text"
          id="name-input"
          name="name"
          value={values.name || ''}
          placeholder="Имя"
          onChange={handleChange}
          className="popup__text popup__text_type_name"
          required
          minLength="2"
          maxLength="40" />
        <span id="name-input-error" className="popup__text-error">{errors.name || ''}</span>
        <input
          type="text"
          id="role-input"
          name="about"
          onChange={handleChange}
          placeholder="Деятельность"
          className="popup__text popup__text_type_role"
          value={values.about || ""}
          required
          minLength="2"
          maxLength="200" />
        <span id="role-input-error" className="popup__text-error">{errors.about || ''}</span>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;