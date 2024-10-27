import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./reducers/globalReducer";

const store = configureStore({
    reducer: {
        globalReducer: globalReducer,
    },
    devTools: true,
});

export default store;