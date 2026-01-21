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

import apiClient from "../service/api_client";
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
import {
  clearAuthToken,
  getAuthToken,
  setAuthToken,
} from "../service/auth";
import store from "../store";

export const registerUser = (username) => async (dispatch) => {
  const { email } = store.getState().user;
  if(!email) {
    return;
  }
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await apiClient.post(registerUrl, {
      username,
      email,
    });

    setAuthToken(data.token);
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

//         const { data } = await axios.post(loginUrl, user, {
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
    const token = getAuthToken();
    if (!token) {
      dispatch({
        type: LOAD_USER_FAILURE,
        payload: "No auth token found",
      });
      return;
    }
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await apiClient.get(getUserDetailsUrl);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    await apiClient.get(userLogoutUrl);
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  } finally {
    clearAuthToken();
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: RESET_ALL_PORTFOLIO_DETAILS });
  }
};

export const updateUserMetaData =
  (doesExist, portfolioData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_META_DATA_REQUEST });
      var data;
      if (doesExist) {
        data = await apiClient.patch(updateUserMetaDataUrl, portfolioData);
      } else {
        data = await apiClient.post(createUserMetaDataUrl, portfolioData);
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
    const { data } = await apiClient.post(sendOtpUrl, { email });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: OTP_VERIFICATION_REQUEST });
    const { data } = await apiClient.post(verifyOtpUrl, { email, otp });
    if (data.success) {
       dispatch({ type: TOGGLE_LOGIN_BOX });
      if (data.isNewUser) {
        dispatch({ type: SHOW_REGISTER_FORM, payload: email });
      } else {
        setAuthToken(data.token);
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
    const { data } = await apiClient.post(googleLoginUrl, { email });
    if (data.success) {
      dispatch({ type: TOGGLE_LOGIN_BOX });
      if (data.isNewUser) {
        dispatch({ type: SHOW_REGISTER_FORM, payload: email });
      } else {
        setAuthToken(data.token);
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
