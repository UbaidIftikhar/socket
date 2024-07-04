import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/common/loader/loader.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Chat from "./container/chat/Chat.jsx";
import AuthLayout from "./components/common/Authorization/AuthLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
            <Route index path={`${import.meta.env.BASE_URL}login`} element={<AuthLayout authentication={false}><LoginPage /> </AuthLayout>} />
            <Route
              path={`${import.meta.env.BASE_URL}chat`}
              element={<AuthLayout authentication={true}> <Chat /></AuthLayout>}
            />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
);
