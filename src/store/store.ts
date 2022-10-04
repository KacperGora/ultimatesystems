import { configureStore } from "@reduxjs/toolkit";
import querySlice from "./querySlice";
// ...

export const store = configureStore({
  reducer: {
    query: querySlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
