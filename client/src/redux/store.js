import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./reducers/globalReducer";
import { userReducer } from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        globalReducer: globalReducer,
        user: userReducer,
    },
    devTools: true,
});

export default store;