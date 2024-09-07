import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import { userApi } from "../services/user/user.service";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer : {
        user : userReducer,
        [userApi.reducerPath] : userApi.reducer // using reducer from userApi
    },
    // api middleware to enagle feture like cashing ivalidation ,polling
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(userApi.middleware)
    }
})


setupListeners(store.dispatch )