import persistReducer from 'redux-persist/es/persistReducer';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;