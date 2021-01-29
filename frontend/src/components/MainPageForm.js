
import React from 'react';
import { Link } from 'react-router-dom';

function MainPageForm(props) {
    return (
        <form
            onSubmit={props.onSubmit}
            className={`form-auth ${props.name}-auth__login`}>
            <h2 className="form-auth__title">
                {props.title}
            </h2>
            {props.children}
            <button
                type="submit"
                className={`form-auth__btn form-auth__btn_type_${props.name} ${props.isDisabled && 'form-auth__btn_disabled'}`} >
                {props.btnText}
            </button>
            <p className="form-auth__text">{props.text} <Link className="form-auth__link" to="/signin">{props.linkText}</Link></p>
        </form>
    )
}

export default MainPageForm;