import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';
import courseService from './course.service';
import userService from '../user/user.service';

export const initialState = {
  courses: [],
  enrolledCourses: [],
  completedCourses: [],
  activeCourse: null
};

export const fetchEnrolledCourses = createAsyncThunk(
  'course/fetchEnrolledCourses',
  async userId => {
    return await courseService.fetchEnrolledCoursesByUserId(userId);
  }
);

export const fetchCourse = createAsyncThunk(
  'course/fetchCourse',
  async courseId => {
    return await courseService.fetchById(courseId);
  }
);

export const fetchCourseUser = createAsyncThunk(
  'course/fetchCourseUser',
  async ({ courseId, userId }) => {
    return await userService.getCourseInfo(userId, courseId);
  }
);

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async ( _, thunkAPI ) => {
    return await courseService.fetchAll();
  }
);

export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async ( courseId, thunkAPI ) => {
    return await courseService.delete(courseId);
  }
);

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setActiveCourse: ( state, action ) => {
      state.activeCourse = action.payload;
    },
    setCourseCompleted: ( state, action ) => {
      state.completedCourses = [
        ...state.completedCourses,
        state.enrolledCourses.find(course => course.id === action.payload)
      ];
    },
    updateCurrentLectureForCourse: ( state, action ) => {
      const { courseId, lastLectureId } = action.payload;

      const updatedCourse = state.enrolledCourses.find(course => course.id === courseId);

      if (!updatedCourse) {
        return;
      }

      updatedCourse.lastLectureId = lastLectureId;

      // replace entry without lastLectureId with the updated one
      state.enrolledCourses = [
        ...state.enrolledCourses.filter(course => course.id !== courseId),
        updatedCourse
      ];

      // make sure activeCourse gets updated too
      const activeCourse = state.enrolledCourses.find(course => course.id === state.activeCourse.id);

      state.activeCourse = {
        ...activeCourse
      };
    }
  },
  extraReducers: {
    [fetchEnrolledCourses.pending]: state => {
      state.isLoading = true;
    },
    [fetchEnrolledCourses.fulfilled]: ( state, action ) => {
      state.isLoading = false;
      state.enrolledCourses = action.payload;
    },
    [fetchEnrolledCourses.rejected]: state => {
      state.isLoading = false;
      state.enrolledCourses = [];
    },
    [fetchCourse.fulfilled]: ( state, action ) => {
      state.activeCourse = action.payload;
      state.isLoading = false;
    },
    [fetchCourses.fulfilled]: ( state, action ) => {
      state.courses = action.payload;
      state.isLoading = false;
    },
    [deleteCourse.fulfilled]: ( state, action ) => {
      state.courses = [
        ...state.courses.filter(course => course.id !== action.payload)
      ];

      state.isLoading = false;
    }
  }
});

export const { setActiveCourse, setCourseCompleted, updateCurrentLectureForCourse } = courseSlice.actions;

export default courseSlice.reducer;