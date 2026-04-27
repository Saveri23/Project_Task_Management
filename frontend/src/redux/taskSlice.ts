import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  projectId: string;
}

interface TaskState {
  list: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  list: [],
  loading: false,
};

// 🔥 GET TASKS
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (projectId: string) => {
    const res = await API.get(`/tasks/${projectId}`);
    return res.data as Task[];
  }
);

// 🔥 CREATE TASK
export const createTask = createAsyncThunk(
  "tasks/create",
  async (data: { title: string; projectId: string }) => {
    const res = await API.post("/tasks", data);
    return res.data as Task;
  }
);

// 🔥 UPDATE TASK
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }: { id: string; data: Partial<Task> }) => {
    const res = await API.put(`/tasks/${id}`, data);
    return res.data as Task;
  }
);

// 🔥 DELETE TASK
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await API.delete(`/tasks/${id}`);
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })

      // CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;