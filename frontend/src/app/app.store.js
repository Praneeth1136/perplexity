import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/services/auth.slice"

export const store = configureStore({
    reducer:{
        auth:authSlice,
    }
})