import { combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from '../features/darkMode/darkMode.slice';
import authReducer from '../features/auth/auth.slice';
import lectureReducer from '../features/lecture/lecture.slice';
import moduleReducer from '../features/module/module.slice';
import courseReducer from '../features/course/course.slice';
import exerciseReducer from '../features/exercise/exercise.slice';
import quizReducer from '../features/quiz/store/quiz.slice';
import videoReducer from '../features/video/video.slice';
import appReducer from '../features/core/app.slice';
import * as fromApp from '../features/core/app.slice';

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  auth: authReducer,
  lecture: lectureReducer,
  module: moduleReducer,
  course: courseReducer,
  exercise: exerciseReducer,
  quiz: quizReducer,
  video: videoReducer,
  app: appReducer
});

export default rootReducer;

export const getIsLoading = state => fromApp.getIsLoading(state.app);