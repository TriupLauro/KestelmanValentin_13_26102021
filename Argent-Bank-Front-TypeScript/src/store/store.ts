import {configureStore} from "@reduxjs/toolkit";
import {loginSlice} from "./loginSlice";

export const store = configureStore({
    reducer : {
        login : loginSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

