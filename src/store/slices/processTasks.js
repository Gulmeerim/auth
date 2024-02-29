import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { instance } from "../../api/api.config";

export const fetchProcessItems = createAsyncThunk(
  "processItems/fetchProcessItems",
  async () => {
    try {
      const items = await axios.get(`${BASE_URL}/process`);

      return items.data;
    } catch (error) {
      return false;
    }
  }
);

export const postProcessItems = createAsyncThunk(
  "processItems/postProcessItems",
  async (item) => {
    try {
      const res = await axios.post(`${BASE_URL}/process`, item);

      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const deleteProcessItems = createAsyncThunk(
  "processItems/deleteProcessItems",
  async (item) => {
    try {
      await axios.delete(`${BASE_URL}/process/${item.id}`);

      return item.id;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const patchProcessItems = createAsyncThunk(
  "processItems/patchProcessItems",
  async ({ id, description }) => {
    try {
      const res = await instance.patch(`${BASE_URL}/process/${id}`, {
        description,
      });

      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const processTasksSlice = createSlice({
  name: "processTasks",
  initialState: {
    data: [],
    loading: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProcessItems.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchProcessItems.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "fulfilled";
    });
    builder.addCase(fetchProcessItems.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(postProcessItems.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(deleteProcessItems.fulfilled, (state, action) => {
      const item = state.data.find((item) => item.id === action.payload);
      state.data.splice(item, 1);
    });

    builder.addCase(patchProcessItems.fulfilled, (state, action) => {
      state.data = state.data.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    });
  },
});

export const { addTask } = processTasksSlice.actions;
export default processTasksSlice.reducer;
