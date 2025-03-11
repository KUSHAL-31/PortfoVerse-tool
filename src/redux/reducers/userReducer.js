import { createReducer } from "@reduxjs/toolkit";
import { LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants";

const initialState = {
};

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(LOGIN_REQUEST, (state) => {
        state.loading = true;
        state.authUser = false;
    });
    builder.addCase(REGISTER_REQUEST, (state) => {
        state.loading = true;
        state.authUser = false;
    });
    builder.addCase(LOAD_USER_REQUEST, (state) => {
        state.loading = true;
        state.authUser = false;
    });
    builder.addCase(LOGIN_SUCCESS, (state, action) => {
        state.loading = false;
        state.authUser = true;
        state.user = action.payload;
    });
    builder.addCase(REGISTER_SUCCESS, (state, action) => {
        state.loading = false;
        state.authUser = true;
        state.user = action.payload;
    });
    builder.addCase(LOAD_USER_SUCCESS, (state, action) => {
        state.loading = false;
        state.authUser = true;
        state.user = action.payload;
    });
    builder.addCase(LOGIN_FAILURE, (state, action) => {
        state.loading = false;
        state.authUser = false;
        state.user = null;
        state.error = action.payload;
    });
    builder.addCase(REGISTER_FAILURE, (state, action) => {
        state.loading = false;
        state.authUser = false;
        state.user = null;
        state.error = action.payload;
    });
    builder.addCase(LOAD_USER_FAILURE, (state, action) => {
        state.loading = false;
        state.authUser = false;
        state.user = null;
        state.error = action.payload;
    });
    builder.addCase(LOGOUT_SUCCESS, (state) => {
        state.loading = false;
        state.authUser = false;
        state.user = null;
    });
    builder.addCase(LOGOUT_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
});
