import { createReducer } from "@reduxjs/toolkit";
import { DECREMENT_PAGE_COUNT, INCREMENT_PAGE_COUNT, RESET_PAGE_COUNT, TOGGLE_LOGIN_BOX } from "../constants.js";

const initialState = {
    showLoginBox: false,
    pageCount: 1,
};

export const globalReducer = createReducer(initialState, (builder) => {
    builder.addCase(TOGGLE_LOGIN_BOX, (state) => {
        state.showLoginBox = !state.showLoginBox;
    });
    builder.addCase(INCREMENT_PAGE_COUNT, (state) => {
        if (state.pageCount <= 7) {
            state.pageCount++;
        }
    });
    builder.addCase(DECREMENT_PAGE_COUNT, (state) => {
        if (state.pageCount > 1) {
            state.pageCount--;
        }
    });
    builder.addCase(RESET_PAGE_COUNT, (state) => {
        state.pageCount = 1;
    });
});

