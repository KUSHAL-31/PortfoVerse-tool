import { createReducer } from "@reduxjs/toolkit";
import {
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT_FAILURE,
  OTP_VERIFICATION_REQUEST,
  OTP_VERIFICATION_SUCCESS,
  OTP_VERIFICATION_FAILURE,
  SHOW_REGISTER_FORM,
  HIDE_REGISTER_FORM,
  SEND_OTP,
} from "../constants";

const initialState = {
  showRegistrationPopup: false,
  isOtpInvalid : false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(GOOGLE_LOGIN_REQUEST, (state) => {
    // state.loading = true;
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
  builder.addCase(GOOGLE_LOGIN_SUCCESS, (state, action) => {
    state.loading = false;
    state.authUser = true;
    state.user = action.payload;
  });
  builder.addCase(REGISTER_SUCCESS, (state, action) => {
    state.loading = false;
    state.authUser = true;
    state.showRegistrationPopup = false;
    state.user = action.payload;
  });
  builder.addCase(LOAD_USER_SUCCESS, (state, action) => {
    state.loading = false;
    state.authUser = true;
    state.user = action.payload;
  });
  builder.addCase(GOOGLE_LOGIN_FAILURE, (state, action) => {
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
  builder.addCase(SEND_OTP, (state) => {
    state.isOtpInvalid = false;
  });
  builder.addCase(OTP_VERIFICATION_REQUEST, (state, action) => {
    // state.loading = true;
    state.authUser = false;
  });
  builder.addCase(OTP_VERIFICATION_SUCCESS, (state, action) => {
   state.loading = false;
   state.authUser = true;
   state.user = action.payload;
    // state.isOtpInvalid = false;
  });
  builder.addCase(OTP_VERIFICATION_FAILURE, (state, action) => {
    state.loading = false;
    state.user = null;
    state.authUser = false;
    state.error = action.payload;
    state.isOtpInvalid = true;
  });
  builder.addCase(SHOW_REGISTER_FORM, (state, action) => {
    state.showRegistrationPopup = true;
    state.authUser = false;
    state.email = action.payload;
  });
  builder.addCase(HIDE_REGISTER_FORM, (state) => {
    state.showRegistrationPopup = false;
  });
});
