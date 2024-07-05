import { createSlice } from "@reduxjs/toolkit";
import { getSocketInstance, setSocketInstance } from "../../socket/socket";
// import socket, { setSocketInstance } from "../../socket/socket";

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {
    list: [],
  },
  reducers: {
    setConversations(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setConversations } = conversationsSlice.actions;

export const fetchConversations = (userId) => (dispatch) => {
  const socket = getSocketInstance();
  socket.emit("get_all_convo", { userId });

  socket.on("all_convo", (conversations) => {
    dispatch(setConversations(conversations));
  });

  socket.on("convo_error", (error) => {
    console.error(error);
  });

  //   setSocketInstance(socket);
};

export default conversationsSlice.reducer;
