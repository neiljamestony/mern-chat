import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  room: null,
  isUserTyping: { typing: false, sender: null },
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.users = action.payload;
    },
    updateRoom: (state, action) => {
      state.room = action.payload;
    },
    isTyping: (state, action) => {
      state.isUserTyping = action.payload;
    },
  },
});

export const { updateUser, updateRoom, isTyping } = chatSlice.actions;

export default chatSlice.reducer;
