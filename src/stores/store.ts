import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import { userApi } from "../services/user/user.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import productReducer from "./slices/product.slice";
import { productApi } from "../services/product/product.service";
import chatReducer from "./slices/chat.slice";
import { chatApi } from "../services/chat/chat.service";

export const store = configureStore({
    reducer : {
        user: userReducer,
        product: productReducer,
        chat: chatReducer,
        [userApi.reducerPath]: userApi.reducer, // Using reducer from userApi
        [productApi.reducerPath]: productApi.reducer, // Add productApi.reducer
        [chatApi.reducerPath]: chatApi.reducer, // Add chatAPI.reducer
    },
    // Add middleware for API features like caching, invalidation, polling
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(userApi.middleware, productApi.middleware,chatApi.middleware); // Add productApi middleware
    },
})


setupListeners(store.dispatch )