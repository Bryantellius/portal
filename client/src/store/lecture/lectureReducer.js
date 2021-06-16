import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentLecture: undefined,
  lectures: [],
  completedLectures: []
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
    },
    setLectureCompleted(state, action) {
      state.completedLectures = [
        ...state.completedLectures || [],
        action.payload
      ];
    }
  }
});

export const {
  setLectures,
  setCurrentLecture,
  setLectureCompleted
} = lectureSlice.actions;

const lectureReducer = lectureSlice.reducer;
export default lectureReducer;