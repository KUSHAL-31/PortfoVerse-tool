import {
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOGGLE_LOGIN_BOX,
  UPDATE_USER_META_DATA_FAILURE,
  UPDATE_USER_META_DATA_REQUEST,
  UPDATE_USER_META_DATA_SUCCESS,
  RESET_ALL_PORTFOLIO_DETAILS,
  OTP_VERIFICATION_REQUEST,
  OTP_VERIFICATION_FAILURE,
  OTP_VERIFICATION_SUCCESS,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_FAILURE,
  GOOGLE_LOGIN_SUCCESS,
  SHOW_REGISTER_FORM,
  SEND_OTP,
} from "../constants";

import axios from "axios";
import {
  createUserMetaDataUrl,
  getUserDetailsUrl,
  googleLoginUrl,
  registerUrl,
  sendOtpUrl,
  updateUserMetaDataUrl,
  userLogoutUrl,
  verifyOtpUrl,
} from "../service/api_url";
import store from "../store";

export const registerUser = (username) => async (dispatch) => {
  const { email } = store.getState().user;
  if(!email) {
    return;
  }
  try {
    dispatch({ type: REGISTER_REQUEST });

    // Set `withCredentials` to allow cross-origin cookies
    const { data } = await axios.post(registerUrl, {
      username,
      email,
    }, {
      withCredentials: true, // This ensures cookies are saved from the response
    });

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });

    dispatch({ type: TOGGLE_LOGIN_BOX });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

// export const loginUser = (user) => async (dispatch) => {
//     // const navigate = useNavigate();

//     try {
//         dispatch({ type: LOGIN_REQUEST });

//         // Add withCredentials to allow cookies to be stored
//         const { data } = await axios.post(loginUrl, user, {
//             withCredentials: true, // This allows cross-origin cookies to be set
//         });

//         dispatch({ type: LOGIN_SUCCESS, payload: data.user });

//         dispatch({ type: TOGGLE_LOGIN_BOX });

//     } catch (error) {
//         dispatch({
//             type: LOGIN_FAILURE,
//             payload: error.response?.data?.message || "An error occurred",
//         });
//     }
// };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    // Set withCredentials to include cookies in the request
    const { data } = await axios.get(getUserDetailsUrl, {
      withCredentials: true, // Ensures cookies are included
    });

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    // Set withCredentials to include cookies in the request
    await axios.get(userLogoutUrl, {
      withCredentials: true, // Ensures cookies are included
    });

    dispatch({ type: LOGOUT_SUCCESS });

    dispatch({ type: RESET_ALL_PORTFOLIO_DETAILS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const updateUserMetaData =
  (doesExist, portfolioData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_META_DATA_REQUEST });
      var data;
      if (doesExist) {
        data = await axios.patch(updateUserMetaDataUrl, portfolioData, {
          withCredentials: true,
        });
      } else {
        data = await axios.post(createUserMetaDataUrl, portfolioData, {
          withCredentials: true,
        });
      }
      dispatch({
        type: UPDATE_USER_META_DATA_SUCCESS,
        payload: data.userMetaData,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_META_DATA_FAILURE,
        payload: error.response?.data?.message || "Some error occurred",
      });
    }
  };

export const sendOtp = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_OTP });
    const { data } = await axios.post(sendOtpUrl, { email });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: OTP_VERIFICATION_REQUEST });
    const { data } = await axios.post(verifyOtpUrl, { email, otp },
      {
        withCredentials: true, // This allows cross-origin cookies to be set
      }
    );
    if (data.success) {
       dispatch({ type: TOGGLE_LOGIN_BOX });
      if (data.isNewUser) {
        dispatch({ type: SHOW_REGISTER_FORM, payload: email });
      } else {
        dispatch({
          type: OTP_VERIFICATION_SUCCESS,
          payload: data.user,
        });
      }
    } else {
      dispatch({
        type: OTP_VERIFICATION_FAILURE,
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  } catch (error) {
    dispatch({
      type: OTP_VERIFICATION_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const googleLoginUser = (email) => async (dispatch) => {
  try {
    dispatch({ type: GOOGLE_LOGIN_REQUEST });
    // Add withCredentials to allow cookies to be stored
    const { data } = await axios.post(googleLoginUrl, {email}, {
      withCredentials: true, // This allows cross-origin cookies to be set
    });
    if (data.success) {
      dispatch({ type: TOGGLE_LOGIN_BOX });
      if (data.isNewUser) {
        dispatch({ type: SHOW_REGISTER_FORM, payload: email });
      } else {
        dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: data.user });
      }
    } else {
      dispatch({
        type: GOOGLE_LOGIN_FAILURE,
        payload: data.message || "Some error occurred",
      });
    }
  } catch (error) {
    dispatch({
      type: GOOGLE_LOGIN_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};
