import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import socketSlice from "./socket/socketSlice";
import roomSlice from "./socket/roomSlice";
import messageSlice from "./socket/messageSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    socket: socketSlice,
    messages: messageSlice,
    conversations: roomSlice,
    // Add more reducers here
  },
});

export default store;
