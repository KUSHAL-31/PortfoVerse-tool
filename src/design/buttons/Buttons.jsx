import React from "react";
import "./Buttons.scss";

// This is normal small button
export const Button1 = ({ text, onClick }) => {
  return (
    <button className="button1" onClick={() => onClick()}>
      {text}
    </button>
  );
};
