import { configureStore } from "@reduxjs/toolkit";
import userReduce from './slices/userSlice'
export const store = configureStore({
    reducer: userReduce
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch