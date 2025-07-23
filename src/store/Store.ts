import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./slices/HeaderSlice";
import counterSlice from "./slices/counter";
export const store = configureStore({
  reducer: {
    header: headerReducer,
    counter: counterSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
