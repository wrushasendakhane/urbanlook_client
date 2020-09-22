import React from "react";

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
  return (
    <button
      className={`btn ${isGoogleSignIn ? "btn-primary" : "btn-secondary"}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
