import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';

export const initialState = {
  isLoading: false,
  videos: []
};

export const searchVideos = createAsyncThunk(
  'video/search',
  async (query, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/video/search/${ query }`);
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.isLoading = false;
      })
      .addCase(searchVideos.pending, state => {
        state.isLoading = true;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default videoSlice.reducer;