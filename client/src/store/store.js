import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import persistedReducer from './persistConfig';

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
  preloadedState: {
    auth: {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
      token: localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null,
      isAuthenticated: !!localStorage.getItem('token'),
      isLoading: true,
      error: null
    },
    darkMode: false,
    lecture: {
      lectures: [],
      completedLectures: [],
      currentLecture: null
    },
    module: {
      modules: []
    },
    course: {
      enrolledCourses: [],
      activeCourse: null,
      completedCourses: []
    }
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export default store;