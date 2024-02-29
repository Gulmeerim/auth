import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { instance } from "../../api/api.config";

export const fetchNewItems = createAsyncThunk(
  "newItems/fetchNewItems",
  async () => {
    try {
      const items = await axios.get(`${BASE_URL}/new`);
      return items.data;
    } catch (error) {
      return false;
    }
  }
);

export const postNewItems = createAsyncThunk(
  "newItems/postNewItems",
  async (item) => {
    try {
      const res = await instance.post(`${BASE_URL}/new`, item);

      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const deleteNewItems = createAsyncThunk(
  "newItems/deleteNewItems",
  async (item) => {
    try {
      await axios.delete(`${BASE_URL}/new/${item.id}`);

      return item;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const patchNewItems = createAsyncThunk(
  "newItems/patchNewItems",
  async ({ id, description }) => {
    try {
      const res = await instance.patch(`${BASE_URL}/new/${id}`, {
        description,
      });

      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const newTasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    loading: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewItems.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchNewItems.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "fulfilled";
    });
    builder.addCase(fetchNewItems.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(postNewItems.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(deleteNewItems.fulfilled, (state, action) => {
      const item = state.data.find((item) => item.id === action.payload);
      state.data.splice(item, 1);
    });

    builder.addCase(patchNewItems.fulfilled, (state, action) => {
      state.data = state.data.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    });
  },
});

export default newTasksSlice.reducer;
