import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import querySlice from "./querySlice";

export const store = configureStore({
  reducer: {
    query: querySlice,
    modal: modalSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
