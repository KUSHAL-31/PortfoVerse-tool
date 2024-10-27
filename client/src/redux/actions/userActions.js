import {
    LOAD_USER_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_FAILURE, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST,
    LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS
} from "../constants"

import axios from "axios";
import { getUserDetailsUrl, loginUrl, registerUrl } from "../service/api_url";
import { redirect, useNavigate } from "react-router-dom";

export const registerUser = (user) => async (dispatch) => {
    const navigate = useNavigate();

    try {
        dispatch({ type: REGISTER_REQUEST });

        // Set `withCredentials` to allow cross-origin cookies
        const { data } = await axios.post(registerUrl, user, {
            withCredentials: true, // This ensures cookies are saved from the response
        });

        dispatch({ type: REGISTER_SUCCESS, payload: data.user });

        // Use navigate instead of redirect for in-app navigation
        navigate("/create-profile");

        // Optionally, call loadUser if you want to fetch and update the user state
        // dispatch(loadUser());
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

        console.log(data);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });

        // Use navigate instead of redirect for React Router navigation
        // navigate("/create-profile");

        // Uncomment if loadUser is needed
        // dispatch(loadUser());
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
};


export const loadUser = () => async (dispatch) => {
    // const navigate = useNavigate();
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        // Set withCredentials to include cookies in the request
        const { data } = await axios.get(getUserDetailsUrl, {
            withCredentials: true, // Ensures cookies are included
        });

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });

        // Use navigate instead of redirect for smooth in-app navigation
        // navigate("/create-profile");
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAILURE,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
};