import { combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from '../features/darkMode/darkMode.slice';
import authReducer from '../features/auth/auth.slice';
import lectureReducer from '../features/lecture/lecture.slice';
import moduleReducer from '../features/module/module.slice';
import courseReducer from '../features/course/course.slice';
import userReducer from '../features/user/user.slice';
import exerciseReducer from '../features/exercise/exercise.slice';
import quizReducer from '../features/quiz/quiz.slice';
import videoReducer from '../features/video/video.slice';

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  auth: authReducer,
  lecture: lectureReducer,
  module: moduleReducer,
  course: courseReducer,
  user: userReducer,
  exercise: exerciseReducer,
  quiz: quizReducer,
  video: videoReducer
});

export default rootReducer;