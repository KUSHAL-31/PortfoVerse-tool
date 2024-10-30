import {
    LOAD_USER_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_FAILURE, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST,
    LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
    TOGGLE_LOGIN_BOX,
    UPDATE_USER_META_DATA_FAILURE,
    UPDATE_USER_META_DATA_REQUEST,
    UPDATE_USER_META_DATA_SUCCESS
} from "../constants"

import axios from "axios";
import { createUserMetaDataUrl, getUserDetailsUrl, loginUrl, registerUrl, updateUserMetaDataUrl, userLogoutUrl } from "../service/api_url";

export const registerUser = (user) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_REQUEST });

        // Set `withCredentials` to allow cross-origin cookies
        const { data } = await axios.post(registerUrl, user, {
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

export const loginUser = (user) => async (dispatch) => {
    // const navigate = useNavigate();

    try {
        dispatch({ type: LOGIN_REQUEST });

        // Add withCredentials to allow cookies to be stored
        const { data } = await axios.post(loginUrl, user, {
            withCredentials: true, // This allows cross-origin cookies to be set
        });

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });

        dispatch({ type: TOGGLE_LOGIN_BOX });

    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
};


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

    } catch (error) {
        dispatch({
            type: LOGOUT_FAILURE,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
}

// Meta data related actions
export const createUserMetaData = (portfolioData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_USER_META_DATA_REQUEST });

        dispatch({ type: CREATE_USER_META_DATA_SUCCESS, payload: data.userMetaData });
    } catch (error) {
        dispatch({
            type: CREATE_USER_META_DATA_FAILURE,
            payload: error.response?.data?.message || "Some error occurred",
        });
    }
}

export const updateUserMetaData = (doesExist, portfolioData) => async (dispatch) => {
    console.log(doesExist, "doesExist");
    console.log(portfolioData, "portfolioData");
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
        dispatch({ type: UPDATE_USER_META_DATA_SUCCESS, payload: data.userMetaData });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_META_DATA_FAILURE,
            payload: error.response?.data?.message || "Some error occurred",
        });
    }
}