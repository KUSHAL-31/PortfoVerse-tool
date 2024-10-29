import React, { useState } from "react";
import "./Header.scss";
import "../../design/Buttons.scss";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_LOGIN_BOX } from "../../redux/constants";
import { logoutUser } from "../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { Modal1 } from "../../design/modals/Modals";

const Header = () => {
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false);
    dispatch(logoutUser());
  };

  const navigate = useNavigate();

  return (
    <div className="header">
      <Modal1
        showModal={showModal}
        setShowModal={setShowModal}
        title={"Do you really want to logout"}
        button1Text={"Yes"}
        button2Text={"No"}
        onClick1={handleLogout}
        onClick2={() => setShowModal(false)}
      />
      <div className="header_left">
        <h3 className="website_logo" onClick={() => navigate("/")}>
          <span className="logo_text1">K31</span>
          <span className="logo_text2">Portfolio</span>
        </h3>
      </div>
      <div className="header_right">
        {authUser === undefined || authUser === false ? (
          <button
            className="button1"
            onClick={() => dispatch({ type: TOGGLE_LOGIN_BOX })}
          >
            Login
          </button>
        ) : (
          <button className="button1" onClick={() => setShowModal(true)}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
