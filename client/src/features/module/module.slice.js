import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';

export const initialState = {
  modules: [],
  module: null
};

export const fetchModule = createAsyncThunk(
  'module/fetchModule',
  async (moduleId, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/module/${ moduleId }`);
  }
);

export const fetchModules = createAsyncThunk(
  'module/fetchModules',
  async (courseId, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/course/${ courseId }/module`);
  }
);

const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    setModules(state, action) {
      state.modules = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchModule.fulfilled, (state, action) => {
        state.module = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.modules = action.payload;
        state.isLoading = false;
      });
  }
});

export const {
  setModules
} = moduleSlice.actions;

export default moduleSlice.reducer;