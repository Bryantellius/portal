import { combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from './darkMode/reducers/darkModeReducer';
import authReducer from './auth/reducers/authReducer';
import lectureReducer from './lecture/lectureReducer';
import moduleReducer from './module/moduleReducer';

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  auth: authReducer,
  lecture: lectureReducer,
  module: moduleReducer
});

export default rootReducer;