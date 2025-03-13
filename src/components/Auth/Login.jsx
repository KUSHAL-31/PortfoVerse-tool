import React, { useState, useEffect, useRef } from "react";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@mui/material";
import { Google } from "@mui/icons-material";
import { TOGGLE_LOGIN_BOX } from "../../redux/constants";
import { googleLoginUser, sendOtp, verifyOtp } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import OTPInput from "react-otp-input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const timerRef = useRef(null);

  const [googleUser, setGoogleUser] = useState(null);

  const { isOtpInvalid } = useSelector((state) => state.user);

  const startResendTimer = () => {
    setResendTimer(120); // 120 seconds = 2 minutes
    setEmailDisabled(true);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format seconds into mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const LoginSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp(loginEmail, otp));
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (loginEmail && !resendTimer) {
      // Here you would dispatch an action to send OTP to the email
      // dispatch(sendOTP(loginEmail));
      setShowOTP(true);
      startResendTimer();
    }
    dispatch(sendOtp(loginEmail));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (googleUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          // // Handle successful Google login
          dispatch(googleLoginUser(res.data.email));
        })
        .catch((err) => console.log(err));
    }
  }, [googleUser, navigate]);

  useEffect(() => {
    if (resendTimer === 0 && emailDisabled) {
      setEmailDisabled(false);
    }
  }, [resendTimer, emailDisabled]);

  return (
    <>
      <Dialog
        open={true}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
            maxWidth: "500px",
            margin: "20px",
          },
        }}
      >
        <div className="auth-container">
          <div className="auth-close-btn">
            <button onClick={() => dispatch({ type: TOGGLE_LOGIN_BOX })}>
              ×
            </button>
          </div>

          <div className="auth-content">
            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p>Please login to continue</p>
            </div>

            <div className="auth-forms-container">
              <form className="auth-form" onSubmit={LoginSubmit}>
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={loginEmail}
                    disabled={emailDisabled}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (showOTP) {
                        setShowOTP(false);
                        setOtp("");
                        if (timerRef.current) {
                          clearInterval(timerRef.current);
                          setResendTimer(0);
                        }
                      }
                    }}
                  />
                </div>

                {!showOTP && (
                  <button
                    type="button"
                    className="send-otp-btn"
                    onClick={handleSendOTP}
                    disabled={!loginEmail || resendTimer > 0}
                  >
                    Send OTP
                  </button>
                )}

                {showOTP && (
                  <div className="otp-container">
                    {isOtpInvalid ? <p>
                      The OTP you entered is invalid. Please try again.
                    </p> : <p>
                      Enter the OTP sent to your email
                    </p>}
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      inputType="number"
                      renderSeparator={<span className="otp-separator"></span>}
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="otp-input"
                          style={
                            isOtpInvalid
                              ? {
                                  borderColor: "#ff5b58",
                                }
                              : {}
                          }
                        />
                      )}
                      containerStyle="otp-input-container"
                    />
                    <div className="otp-actions">
                      {resendTimer > 0 ? (
                        <div className="resend-timer">
                          Resend in <span>{formatTime(resendTimer)}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="resend-otp-btn"
                          onClick={handleSendOTP}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {showOTP && (
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={otp.length !== 6}
                  >
                    Login
                  </button>
                )}

                <div className="divider">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  className="google-btn"
                  onClick={handleGoogleLogin}
                >
                  <Google /> Continue with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Login;
