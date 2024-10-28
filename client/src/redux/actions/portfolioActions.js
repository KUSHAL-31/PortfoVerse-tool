import {
    GET_ALL_USER_PORTFOLIO_FAILURE, GET_ALL_USER_PORTFOLIO_REQUEST, GET_ALL_USER_PORTFOLIO_SUCCESS
} from "../constants"

import axios from "axios";
import { getAllUserPortfolioUrl } from "../service/api_url";

export const getAllUserPortfolios = () => async (dispatch) => {

    console.log("getAllUserPortfolios");

    try {
        dispatch({ type: GET_ALL_USER_PORTFOLIO_REQUEST });

        // Set `withCredentials` to allow cross-origin cookies
        const { data } = await axios.get(getAllUserPortfolioUrl, {
            withCredentials: true, // This ensures cookies are saved from the response
        });

        console.log(data);

        dispatch({ type: GET_ALL_USER_PORTFOLIO_SUCCESS, payload: data.portfolios });

    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_USER_PORTFOLIO_FAILURE,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
};
