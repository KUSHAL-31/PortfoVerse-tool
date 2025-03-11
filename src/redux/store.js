import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./reducers/globalReducer";
import { userReducer } from "./reducers/userReducer";
import { portfolioReducer } from "./reducers/portfolioReducer";

const store = configureStore({
    reducer: {
        globalReducer: globalReducer,
        user: userReducer,
        userPortfolio: portfolioReducer,
    },
    devTools: true,
});

export default store;