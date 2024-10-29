import {
    CREATE_NEW_PORTFOLIO_FAILURE,
    CREATE_NEW_PORTFOLIO_REQUEST,
    CREATE_NEW_PORTFOLIO_SUCCESS,
    GET_ALL_USER_PORTFOLIO_FAILURE, GET_ALL_USER_PORTFOLIO_REQUEST, GET_ALL_USER_PORTFOLIO_SUCCESS,
    GET_PORTFOLIO_DETAILS_FAILURE,
    GET_PORTFOLIO_DETAILS_REQUEST,
    GET_PORTFOLIO_DETAILS_SUCCESS
} from "../constants"

import axios from "axios";
import { createNewPortfolioUrl, getAllUserPortfolioUrl, getPortfolioDetailByIdUrl } from "../service/api_url";
import store from "../store";

export const getAllUserPortfolios = () => async (dispatch) => {

    try {
        dispatch({ type: GET_ALL_USER_PORTFOLIO_REQUEST });

        // Set `withCredentials` to allow cross-origin cookies
        const { data } = await axios.get(getAllUserPortfolioUrl, {
            withCredentials: true, // This ensures cookies are saved from the response
        });

        dispatch({ type: GET_ALL_USER_PORTFOLIO_SUCCESS, payload: data.portfolios });

    } catch (error) {
        dispatch({
            type: GET_ALL_USER_PORTFOLIO_FAILURE,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
};


export const createNewPortfolio = () => async (dispatch) => {
    dispatch({ type: CREATE_NEW_PORTFOLIO_REQUEST })
    try {
        const { user } = store.getState().user;
        const username = user.username;
        const headerTitle = user.username;
        const websiteName = username.split(' ').join('-');
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        const websiteNameWithDigits = `${websiteName}-${randomDigits}`;
        const websiteUrl = `${import.meta.env.VITE_REACT_APP_PORTFOLIO_URL}/${websiteNameWithDigits}`;
        const { data } = await axios.post(createNewPortfolioUrl, {
            headerTitle,
            websiteName: websiteNameWithDigits,
            websiteUrl,
            isPublished: false,
        }, {
            withCredentials: true,
        });

        // console.log(data);

        dispatch({ type: CREATE_NEW_PORTFOLIO_SUCCESS, payload: data });

        dispatch(getAllUserPortfolios());
    } catch (error) {
        dispatch({
            type: CREATE_NEW_PORTFOLIO_FAILURE,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
}

export const getPortfolioDetailById = (portfolioId) => async (dispatch) => {
    try {
        dispatch({ type: GET_PORTFOLIO_DETAILS_REQUEST });
        // Set `withCredentials` to allow cross-origin cookies
        const { data } = await axios.post(getPortfolioDetailByIdUrl, {
            portfolioId,
        }, {
            withCredentials: true, // This ensures cookies are saved from the response
        });

        dispatch({ type: GET_PORTFOLIO_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: GET_PORTFOLIO_DETAILS_FAILURE,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
}