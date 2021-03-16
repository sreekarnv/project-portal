import React from 'react'

import './checkbox.scss'

const Checkbox = ({hasError, label, type, onChange, name,checked}) => {

    const checkboxClassname = `
    m-checkbox
    ${type === 'switch' && 'm-checkbox--switch'}
    ${hasError && 'm-checkbox--has-error'}`;

    const inputClassname = `
    m-checkbox__input
    ${type === 'switch' && 'm-checkbox--switch__input'}
    ${hasError && 'm-checkbox--has-error__input'}
    `;

    const labelClassname = `
    m-checkbox__label
    ${type === 'switch' && 'm-checkbox--switch__label'}
    `;

    return (
        <div className={checkboxClassname}>
            <input
                type="checkbox"
                className={inputClassname}
                onChange={onChange}
                name={name}
                checked={checked}
            ></input>
            <label
                className={labelClassname}
            >{label}</label>
        </div>
    );
};

export default Checkbox;