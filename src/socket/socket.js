import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.18.3:3000";

const socket = io(SOCKET_URL);

let socketInstance = null;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
};

export const getSocketInstance = () => socket;

export default socket;
