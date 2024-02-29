import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (loginData) => {
    try {
      const response = await AuthService.login(
        loginData.email,
        loginData.password
      );

      console.log(response);
      const { token, data } = response.data;
      localStorage.setItem("token", token);

      console.log(data);
      return data;
    } catch (error) {
      return false;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user") || { userName: "User" },
    loading: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.user = action.payload;
      localStorage.setItem("user", state.user);
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export default userSlice.reducer;
