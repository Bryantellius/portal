import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';

export const initialState = {
  courses: [],
  enrolledCourses: [],
  completedCourses: [],
  activeCourse: null
};

export const fetchEnrolledCourses = createAsyncThunk(
  'course/fetchEnrolledCourses',
  async userId => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/user/${ userId }/course`);
  }
);

export const fetchCourse = createAsyncThunk(
  'course/fetchCourse',
  async ( courseId, thunkAPI ) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/course/${ courseId }`);
  }
);

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async ( _, thunkAPI ) => {
    const apiClient = new ApiClient();
    return await apiClient.get('/course');
  }
);

export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async ( courseId, thunkAPI ) => {
    const apiClient = new ApiClient();
    await apiClient.delete(`/course/${ courseId }`);
    return courseId;
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
  extraReducers: builder => {
    builder
    .addCase(fetchEnrolledCourses.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchEnrolledCourses.fulfilled, ( state, action ) => {
      state.isLoading = false;
      state.enrolledCourses = action.payload;
    })
    .addCase(fetchEnrolledCourses.rejected, state => {
      state.isLoading = false;
      state.enrolledCourses = [];
    })
    .addCase(fetchCourse.fulfilled, ( state, action ) => {
      state.course = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchCourses.fulfilled, ( state, action ) => {
      state.courses = action.payload;
      state.isLoading = false;
    })
    .addCase(deleteCourse.fulfilled, ( state, action ) => {
      state.courses = [
        ...state.courses.filter(course => course.id !== action.payload)
      ];

      state.isLoading = false;
    });

    const keepLastLectureId = ( fetchedCourse, existingCourses ) => {
      const existingCourse = existingCourses.find(course => course?.id === fetchedCourse?.id);

      if (!existingCourse) {
        return fetchedCourse;
      }

      if (existingCourse.lastLectureId) {
        fetchedCourse.lastLectureId = existingCourse.lastLectureId;
      }

      return fetchedCourse;
    };
  }
});

export const { setActiveCourse, setCourseCompleted, updateCurrentLectureForCourse } = courseSlice.actions;

export default courseSlice.reducer;