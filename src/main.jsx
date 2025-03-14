import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6347", // Custom primary color (Tomato)
      contrastText: "#ffffff", // Text color on primary button
    },
    secondary: {
      main: "rgb(255, 72, 0)", // Custom secondary color (Dark Gray)
      contrastText: "#ffffff", // Text color on secondary button
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Removes uppercase text
        },
        containedPrimary: {
          backgroundColor: "#FF6347",
          "&:hover": {
            backgroundColor: "#d5533f", // Darker shade on hover
          },
        },
        containedSecondary: {
          backgroundColor: "rgb(255, 255, 255)",
          "&:hover": {
            backgroundColor: "rgb(255, 255, 255)", // Lighter shade on hover
          },
        },
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
      >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
);
