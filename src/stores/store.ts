import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import { userApi } from "../services/user/user.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import productReducer from "./slices/product.slice";
import { productApi } from "../services/product/product.service";
import chatReducer from "./slices/chat.slice";
import { chatApi } from "../services/chat/chat.service";
import commentSlice from "./slices/comment.slice";
import { commentApi } from "../services/Comment/comment.service";
import reportSlice from "./slices/report.slice";
import { reportApi } from "../services/report/report.service";
import wishListReducer from "./slices/wishList.slice";
import { wishListApi } from "../services/WishList/wishList.service";

export const store = configureStore({
    reducer : {
        user: userReducer,
        product: productReducer,
        chat: chatReducer,
        comment: commentSlice,
        wishList: wishListReducer,
        report: reportSlice,
        [userApi.reducerPath]: userApi.reducer, // Using reducer from userApi
        [productApi.reducerPath]: productApi.reducer, // Add productApi.reducer
        [chatApi.reducerPath]: chatApi.reducer, // Add chatAPI.reducer
        [commentApi.reducerPath]: commentApi.reducer,
        [wishListApi.reducerPath]: wishListApi.reducer,
        [reportApi.reducerPath]: reportApi.reducer,
    },
    // Add middleware for API features like caching, invalidation, polling
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(userApi.middleware, productApi.middleware,chatApi.middleware,commentApi.middleware,wishListApi.middleware,reportApi.middleware); // Add productApi middleware
    },
})


setupListeners(store.dispatch )