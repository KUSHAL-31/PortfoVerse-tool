import { createReducer } from "@reduxjs/toolkit";
import { CLEAR_CURRENT_PORTFOLIO, CREATE_NEW_PORTFOLIO_FAILURE, CREATE_NEW_PORTFOLIO_REQUEST, CREATE_NEW_PORTFOLIO_SUCCESS, GET_ALL_USER_PORTFOLIO_FAILURE, GET_ALL_USER_PORTFOLIO_REQUEST, GET_ALL_USER_PORTFOLIO_SUCCESS, SET_CURRENT_PORTFOLIO } from "../constants";

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
    builder.addCase(CREATE_NEW_PORTFOLIO_REQUEST, (state) => {
        state.portfolioLoading = true;
    });
    builder.addCase(CREATE_NEW_PORTFOLIO_SUCCESS, (state) => {
        state.portfolioLoading = false;
    });
    builder.addCase(CREATE_NEW_PORTFOLIO_FAILURE, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
    });
    builder.addCase(SET_CURRENT_PORTFOLIO, (state, action) => {
        state.currentPortfolio = action.payload;
    });
    builder.addCase(CLEAR_CURRENT_PORTFOLIO, (state) => {
        state.currentPortfolio = null;
    });
});

