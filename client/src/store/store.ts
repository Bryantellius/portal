import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import persistedReducer from './persistConfig';
import { IAppUser } from '../common/types';

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
  preloadedState: {
    auth: {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string) as IAppUser
        : null,
      token: localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null
    }
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;