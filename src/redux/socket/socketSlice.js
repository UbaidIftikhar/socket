import { createSlice } from "@reduxjs/toolkit";
import socket, { setSocketInstance } from "../../socket/socket";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    connected: false,
  },
  reducers: {
    setConnected(state, action) {
      state.connected = action.payload;
    },
  },
});

export const { setConnected } = socketSlice.actions;

export const initializeSocket = () => (dispatch) => {
  socket.on("connect", () => {
    console.log("Connected to socket");
    dispatch(setConnected(true));
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket");
    dispatch(setConnected(false));
  });

  setSocketInstance(socket);
};

export const connectUser = (email) => {
  socket.emit("connect_user", email);
};

export default socketSlice.reducer;
