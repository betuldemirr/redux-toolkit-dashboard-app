import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/modules/products/products.slice";
import usersReducer from "@/modules/users/users.slice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;