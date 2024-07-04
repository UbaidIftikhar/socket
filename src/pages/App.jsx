
import { Fragment, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from "react-redux";
import store from '../redux/store';
import Chat from '../container/chat/Chat';

function App() {
  const [MyclassName, setMyClass] = useState("");

  const Bodyclickk = () => {
    if (localStorage.getItem("ynexverticalstyles") == "icontext") {
      setMyClass("");
    }
  };


  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export default App;
