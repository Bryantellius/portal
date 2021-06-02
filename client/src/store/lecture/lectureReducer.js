import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentLecture: null,
  lectures: []
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {
    setLectures(state, action) {
      state.lectures = action.payload;
    },
    setCurrentLecture(state, action) {
      state.currentLecture = action.payload;
    }
  }
});

export const {
  setLectures,
  setCurrentLecture
} = lectureSlice.actions;

const lectureReducer = lectureSlice.reducer;
export default lectureReducer;