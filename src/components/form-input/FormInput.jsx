import React from "react";

function FormInput({ handleChange, label, name, ...otherProps }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={handleChange}
        name={name}
        {...otherProps}
        className="form-control"
      />
    </div>
  );
}

export default FormInput;
