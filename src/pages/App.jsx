import { Outlet } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { connectUser, initializeSocket } from "../redux/socket/socketSlice";
import { useEffect, useState } from "react";
import { getSocketInstance } from "../socket/socket";

function App() {
  const dispatch = useDispatch();
  const { connected } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  useEffect(() => {
    connectUser(user?.email);
  }, []);

  return (
    <div>
      <div>{`Status: ${connected}`}</div>
      <Outlet />
    </div>
  );
}

export default App;
