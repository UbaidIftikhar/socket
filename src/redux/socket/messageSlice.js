import { createSlice } from "@reduxjs/toolkit";
import { getSocketInstance } from "../../socket/socket";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    currentPage: 1,
    totalMessages: 0,
    totalPages: 0,
  },
  reducers: {
    setMessages(state, action) {
      const { messages, currentPage, totalMessages, totalPages } =
        action.payload;
      state.messages = messages;
      state.currentPage = currentPage;
      state.totalMessages = totalMessages;
      state.totalPages = totalPages;
    },
    addMessage(state, action) {
      console.log(action.payload);
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export const getAllMessages =
  (roomId, page = 1, limit = 15) =>
  (dispatch) => {
    const socket = getSocketInstance();
    socket.emit("get_all", { roomId, currentPage: page, limit });

    socket.on("all_messages", (data) => {
      dispatch(setMessages(data));
    });

    socket.on("all_messages:error", (error) => {
      console.error(error);
    });
  };

export const sendMessage = (messageData) => (dispatch) => {
  const socket = getSocketInstance();
  socket.emit("send_message", messageData);

  // socket.on("update_message", (response) => {
  //   const { newId, oldId, roomId } = response;
  //   const newMessage = {
  //     ...messageData.message,
  //     _id: newId,
  //     roomId,
  //   };
  //   console.log(newMessage);
  //   dispatch(addMessage(newMessage));
  // });

  socket.on("send_message:error", (error) => {
    console.error(error);
  });
};

export default messageSlice.reducer;
