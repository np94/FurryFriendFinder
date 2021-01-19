import React from "react";


const Button = ({ children, disabled, handleClick, ...rest }) => {
  const styles = {
    primary: "primary",
    secondary: "secondary",
  };

  let selectedClass;
  for (const key in rest) {
    if (styles[key]) {
      selectedClass = styles[key];
    }
  }

  return (
    <button
      disabled={disabled}
      id="Btn"
      className={`Btn btn-${selectedClass || ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
