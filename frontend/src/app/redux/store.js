import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./ChatSlice";

export const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
});
