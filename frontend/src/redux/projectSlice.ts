import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export interface Project {
  selected: unknown;
  _id: string;
  title: string;
  description?: string;
}

interface ProjectState {
  list: Project[];
  loading: boolean;
}

const initialState: ProjectState = {
  list: [],
  loading: false,
};

// 🔥 GET PROJECTS
export const fetchProjects = createAsyncThunk(
  "projects/fetch",
  async () => {
    const res = await API.get("/projects");
    return res.data as Project[];
  }
);

// 🔥 CREATE PROJECT
export const createProject = createAsyncThunk(
  "projects/create",
  async (data: { title: string; description: string }) => {
    const res = await API.post("/projects", data);
    return res.data as Project;
  }
);

// 🔥 DELETE PROJECT
export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id: string) => {
    await API.delete(`/projects/${id}`);
    return id;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
      })

      // CREATE
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // DELETE
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export default projectSlice.reducer;