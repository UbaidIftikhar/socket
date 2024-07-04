import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
// import userReducer from "./Features/User/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
