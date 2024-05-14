import { configureStore } from "@reduxjs/toolkit";
import userReducer, { fetchUserInfo } from "./user/userSlice";
export const store: any = configureStore({
  reducer: {
    user: userReducer,

  },
});


store.dispatch(fetchUserInfo());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
