import React from "react";

const InputField = ({ value, onChange, placeholder, inputClass }) => {
    return (
        <input
        className={`modal__input ${inputClass}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
    )
}

export default InputField;