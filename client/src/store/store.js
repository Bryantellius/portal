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
        : null
    },
    darkMode: false,
    lecture: {
      lectures: [],
      currentLecture: null
    },
    module: {
      modules: []
    }
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export default store;