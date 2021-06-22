import persistReducer from 'redux-persist/es/persistReducer';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'darkMode'
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;