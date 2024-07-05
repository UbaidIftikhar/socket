import { createSlice } from "@reduxjs/toolkit";
import { getSocketInstance, setSocketInstance } from "../../socket/socket";
// import socket, { setSocketInstance } from "../../socket/socket";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export const getAllMessages = (roomId) => (dispatch) => {
  const socket = getSocketInstance();
  socket.emit("get_all", { roomId });

  socket.on("all_messages", (messages) => {
    dispatch(setMessages(messages));
  });

  socket.on("all_messages:error", (error) => {
    console.error(error);
  });

  //   setSocketInstance(socket);
};

export const sendMessage = (messageData) => (dispatch) => {
  const socket = getSocketInstance();
  socket.emit("send_message", messageData);

  socket.on("update_message", (response) => {
    const { newId, oldId, roomId } = response;
    const newMessage = {
      ...messageData.message,
      _id: newId,
      roomId,
    };
    dispatch(addMessage(newMessage));
  });

  socket.on("send_message:error", (error) => {
    console.error(error);
  });
};

export default messageSlice.reducer;
