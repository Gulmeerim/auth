import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import newTasksSlice from "./slices/newTasksSlice";
import processTasksSlice from "./slices/processTasks";
import finishedTasksSlice from "./slices/finishedTasks";

export const store = configureStore({
  reducer: {
    user: userSlice,
    newTasks: newTasksSlice,
    processTasks: processTasksSlice,
    finishedTasks: finishedTasksSlice,
  },
});
