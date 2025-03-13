import React, { useState } from "react";
import "./Login.scss";
import { Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";

const Registration = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(name));
  };

  return (
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
          <button>×</button>
        </div>

        <div className="auth-content">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Please enter your details to register</p>
          </div>

          <div className="auth-forms-container">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={name.length === 0}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Registration;
