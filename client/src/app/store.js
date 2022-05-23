import { configureStore } from "@reduxjs/toolkit";
import sessionsReducer from "../redux/sessions/sessionsSlice";
import authReducer from "../redux/auth/authSlice";

export const store = configureStore({
  reducer: {
    sessions: sessionsReducer,
    auth: authReducer,
  },
});
