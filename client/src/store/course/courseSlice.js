import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  enrolledCourses: [],
  completedCourses: [],
  activeCourse: null
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setActiveCourse: (state, action) => {
      state.activeCourse = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload.map(course => {
        const existing = state.enrolledCourses.find(existingCourse => existingCourse.id === course.id);
        if (existing?.lastLectureId) {
          course.lastLectureId = existing.lastLectureId;
        }

        return course;
      });
    },
    setCourseCompleted: (state, action) => {
      state.completedCourses = [
        ...state.completedCourses,
        state.enrolledCourses.find(course => course.id === action.payload)
      ];
    },
    setCurrentLectureForCourse: (state, action) => {
      state.enrolledCourses = [
        ...state.enrolledCourses
      ].map(course => {
        if (course.id === action.payload.courseId) {
          course.lastLectureId = action.payload.lastLectureId;
        }

        return course;
      });

      state.activeCourse = state.enrolledCourses.find(course => course.id === state.activeCourse.id);
    }
  }
});

export const { setActiveCourse, setCourseCompleted, setEnrolledCourses, setCurrentLectureForCourse } = courseSlice.actions;

export default courseSlice.reducer;