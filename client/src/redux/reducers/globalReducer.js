import { createReducer } from "@reduxjs/toolkit";
import { TOGGLE_LOGIN_BOX } from "../constants.js";

const initialState = {
    showLoginBox: false,
};

export const globalReducer = createReducer(initialState, (builder) => {
    builder.addCase(TOGGLE_LOGIN_BOX, (state) => {
        state.showLoginBox = !state.showLoginBox;
    });
});

