import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Chat from "./container/chat/Chat.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Loader from "./components/common/loader/loader.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/common/Authorization/AuthLayout.jsx";
import Message from "./container/chat/Message.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
              <Route
                index
                path={`${import.meta.env.BASE_URL}`}
                element={
                  <AuthLayout authentication={false}>
                    <LoginPage />{" "}
                  </AuthLayout>
                }
              />
              <Route
                path={`${import.meta.env.BASE_URL}chat`}
                element={
                  <AuthLayout authentication={true}>
                    <Chat />
                  </AuthLayout>
                }
              >
                <Route index path=":roomId" element={<Message />} />
              </Route>
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);
