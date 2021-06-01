import { combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from './darkMode/reducers/darkModeReducer';
import authReducer from './auth/reducers/authReducer';

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  auth: authReducer
});

export default rootReducer;