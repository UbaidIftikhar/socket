import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  loader: false,
  error: null,
  status: !!JSON.parse(localStorage.getItem("user")),
};

export const LoginAction = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await userService.login(data);
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(LoginAction.pending, (state) => {
        state.loader = true;
      })
      .addCase(LoginAction.fulfilled, (state, action) => {
        state.loader = false;
        state.user = action.payload;
        state.status = true;
      })
      .addCase(LoginAction.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default userSlice.reducer;
