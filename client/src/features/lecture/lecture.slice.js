import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';

export const initialState = {
  currentLecture: undefined,
  lectures: [],
  completedLectures: [],
  isLoading: false
};

export const fetchLecturesByCourseId = createAsyncThunk(
  'lecture/fetchLecturesByCourseId',
  async (courseId, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/course/${ courseId }/lecture`);
  }
);

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {
    setCurrentLecture(state, action) {
      state.currentLecture = action.payload;
    },
    setLectureCompleted(state, action) {
      state.completedLectures = [
        ...state.completedLectures || [],
        action.payload
      ];
    },
    setLectures(state, action) {
      state.lectures = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLecturesByCourseId.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchLecturesByCourseId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lectures = action.payload;
      })
  }
});

export const {
  setCurrentLecture,
  setLectureCompleted,
  setLectures
} = lectureSlice.actions;

export default lectureSlice.reducer;