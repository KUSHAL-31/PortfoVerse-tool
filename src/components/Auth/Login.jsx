import React, { useRef, useState } from "react";
import "./Login.scss";
import {
  MailOutlineOutlined,
  LockOpen,
  Face,
  Phone,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Dialog } from "@mui/material";
import { TOGGLE_LOGIN_BOX } from "../../redux/constants";
import { registerUser, loginUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
// import { login, register, clearErrors } from "../../actions/userActions";
// import { useAlert } from "react-alert";

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  //   const alert = useAlert();

  // const { error, loading, authUser } = useSelector((state) => state.user);
  const loading = false;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const tabSwitcher = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const { username, email, password } = user;

  const LoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: loginEmail, password: loginPassword }));
    navigate("/view-portfolio");
  };

  const SignupSubmit = (e) => {
    e.preventDefault();
    // const myForm = new FormData();
    // myForm.set("username", username);
    // myForm.set("email", email);
    // myForm.set("password", password);
    dispatch(registerUser({ username, email, password, phoneNumber }));
    navigate("/view-portfolio");
  };

  const signupDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const redirect = location.search ? location.search.split("=")[1] : "/account";

  // useEffect(() => {
  //   // if (error) {
  //   //   //   alert.error(error);
  //   //   //   dispatch(clearErrors());
  //   // }
  //   // if (authUser) {
  //   //   history.push(redirect);
  //   // }
  // }, [dispatch, error, authUser, history, redirect]);

  const switchTab = (e, tab) => {
    if (tab === "login") {
      tabSwitcher.current.classList.add("neutralShift");
      tabSwitcher.current.classList.remove("rightShift");
      registerTab.current.classList.remove("neutralFormShift");
      loginTab.current.classList.remove("leftShift");
    }
    if (tab === "register") {
      tabSwitcher.current.classList.add("rightShift");
      tabSwitcher.current.classList.remove("neutralShift");
      registerTab.current.classList.add("neutralFormShift");
      loginTab.current.classList.add("leftShift");
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <div></div>
        </div>
      ) : (
        <Dialog open={true} className="">
          <div className="login_signup_container">
            <div className="login_signup_close">
              <button onClick={() => dispatch({ type: TOGGLE_LOGIN_BOX })}>
                X
              </button>
            </div>
            <div className="login_signup_box">
              {/* Login/Register tab */}
              <div>
                <div className="login_signup_toggle">
                  <p
                    className="login_signup_tab_text"
                    onClick={(e) => switchTab(e, "login")}
                  >
                    LOGIN
                  </p>
                  <p
                    className="login_signup_tab_text"
                    onClick={(e) => switchTab(e, "register")}
                  >
                    REGISTER
                  </p>
                </div>
                <button ref={tabSwitcher}></button>
              </div>

              {/* Login Form */}
              <form
                className="login_form"
                onSubmit={LoginSubmit}
                ref={loginTab}
              >
                <div className="login_email">
                  <MailOutlineOutlined />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="login_password">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Login" className="login_button" />
                <p className="other__methods__text">OR</p>
              </form>

              {/* Signup Form */}
              <form
                className="signup_form"
                onSubmit={SignupSubmit}
                ref={registerTab}
                encType="multipart/form-data"
              >
                <div className="signup_username">
                  <Face />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    name="username"
                    onChange={signupDataChange}
                  />
                </div>
                <div className="signup_email">
                  <MailOutlineOutlined />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={signupDataChange}
                  />
                </div>
                <div className="signup_password">
                  <LockOpen />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={signupDataChange}
                  />
                </div>
                <div className="login_phoneNumber">
                  <Phone />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signup_button"
                />
              </form>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Login;
