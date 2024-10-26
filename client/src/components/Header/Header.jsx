import React from "react";
import "./Header.scss";
import "../../design/Buttons.scss";

const Header = ({ setShowLogin }) => {
  return (
    <div className="header">
      <div className="header_left">
        <h3 className="website_logo">
          <span className="logo_text1">K31</span>
          <span className="logo_text2">Portfolio</span>
        </h3>
      </div>
      <div className="header_right">
        <button className="button1" onClick={() => setShowLogin(true)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
