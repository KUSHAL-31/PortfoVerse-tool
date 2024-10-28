import { createReducer } from "@reduxjs/toolkit";
import { GET_ALL_USER_PORTFOLIO_FAILURE, GET_ALL_USER_PORTFOLIO_REQUEST, GET_ALL_USER_PORTFOLIO_SUCCESS } from "../constants";

const initialState = {
};

export const portfolioReducer = createReducer(initialState, (builder) => {
    builder.addCase(GET_ALL_USER_PORTFOLIO_REQUEST, (state) => {
        state.portfolioLoading = true;
    });
    builder.addCase(GET_ALL_USER_PORTFOLIO_SUCCESS, (state, action) => {
        state.portfolioLoading = false;
        state.userPortfolios = action.payload;
    });
    builder.addCase(GET_ALL_USER_PORTFOLIO_FAILURE, (state, action) => {
        state.portfolioLoading = false;
        state.userPortfolios = null;
        state.portfolioError = action.payload;
    });
});

