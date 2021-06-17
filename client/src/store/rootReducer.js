import { combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from './darkMode/reducers/darkModeReducer';
import authReducer from './auth/authSlice';
import lectureReducer from './lecture/lectureReducer';
import moduleReducer from './module/moduleReducer';
import courseReducer from './course/courseSlice';

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  auth: authReducer,
  lecture: lectureReducer,
  module: moduleReducer,
  course: courseReducer
});

export default rootReducer;