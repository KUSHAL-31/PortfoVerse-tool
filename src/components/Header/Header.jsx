import React, { useState, useEffect } from "react";
import "./Header.scss";
import "../../design/Buttons.scss";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_LOGIN_BOX } from "../../redux/constants";
import { logoutUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { Modal1 } from "../../design/modals/Modals";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowModal(false);
    setMenuOpen(false);
    dispatch(logoutUser());
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Close mobile menu when navigating
  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`header ${scrolled ? "scrolled" : ""} ${
        menuOpen ? "menu-open" : ""
      }`}
    >
      <Modal1
        showModal={showModal}
        setShowModal={setShowModal}
        title={"Do you really want to logout?"}
        button1Text={"Yes"}
        button2Text={"No"}
        onClick1={handleLogout}
        onClick2={() => setShowModal(false)}
      />

      <div className="header_container">
        <div className="header_left">
          <h3 className="website_logo" onClick={() => handleNavigate("/")}>
            <span className="logo_text1">Portfo</span>
            <span className="logo_text2">Verse</span>
          </h3>
        </div>

        <div className="hamburger" onClick={handleMenuToggle}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        <nav className={`navigation ${menuOpen ? "active" : ""}`}>

          <div className="header_right">
            {authUser === undefined || authUser === false ? (
              <button
                className="login_button"
                onClick={() => {
                  dispatch({ type: TOGGLE_LOGIN_BOX });
                  setMenuOpen(false);
                }}
              >
                Login
              </button>
            ) : (
              <button
                className="login_button"
                onClick={() => setShowModal(true)}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;