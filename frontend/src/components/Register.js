import React from 'react';
import MainPageForm from './MainPageForm';
import { useCustomFormAndValidation } from '../hooks/useCustomForm';


function Register(props) {

    const { values, handleChange, errors, isValid, resetForm } = useCustomFormAndValidation();

    function handleSubmit(event) {
        event.preventDefault();
        props.handleRegister(values, resetForm);        
    }

    return (
        <div className="content">
            <MainPageForm
                className={'register'}
                title="Регистрация"
                btnText="Зарегистрироваться"
                onSubmit={handleSubmit}
                isDisabled={isValid}
                text="Уже зарегистрированы?"
                linkText='Войти'
            >
                <>
                    <input
                        type="email"
                        id="email"
                        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                        name="email"
                        value={values.email || ''}
                        placeholder="Email"
                        onChange={handleChange}
                        className="form-auth__input form-auth__input_type_email"
                        required
                        minLength="2"
                        maxLength="70" />
                    <span id="email-input-error" className="form-auth__input-error">{errors.email || ''}</span>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        onChange={handleChange}
                        placeholder="Пароль"
                        className="form-auth__input form-auth__input_type_password"
                        value={values.password || ""}
                        required
                        minLength="5"
                        maxLength="20" />
                    <span id="password-input-error" className="form-auth__input-error">{errors.password || ''}</span>
                </>
            </MainPageForm>

        </div>
    )
}

export default Register;