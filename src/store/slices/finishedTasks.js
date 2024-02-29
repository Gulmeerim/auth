import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { instance } from "../../api/api.config";

export const fetchFinishedItems = createAsyncThunk(
  "finishedItems/fetchFinishedItems",
  async () => {
    try {
      const items = await axios.get(`${BASE_URL}/finished`);

      return items.data;
    } catch (error) {
      return false;
    }
  }
);

export const postFinishedItems = createAsyncThunk(
  "finishedItems/postFinishedItems",
  async (item) => {
    try {
      const res = await instance.post(`${BASE_URL}/finished`, item);

      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const patchFinishedItems = createAsyncThunk(
  "finishedItems/patchFinishedItems",
  async ({id, description}) => {
    try {
      const res = await instance.patch(`${BASE_URL}/finished/${id}`, {
        description
      });

      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const finishedTasksSlice = createSlice({
  name: "finishedTasks",
  initialState: {
    data: [],
    loading: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFinishedItems.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchFinishedItems.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "fulfilled";
    });
    builder.addCase(fetchFinishedItems.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(postFinishedItems.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(patchFinishedItems.fulfilled, (state, action) => {
      state.data = state.data.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    });
  },
});

export const { addTask } = finishedTasksSlice.actions;
export default finishedTasksSlice.reducer;
