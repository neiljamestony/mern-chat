import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  room: null,
  isUserTyping: { typing: false, sender: null },
  onlineUsers: [],
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
    checkOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { updateUser, updateRoom, isTyping, checkOnlineUsers } =
  chatSlice.actions;

export default chatSlice.reducer;
