import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '../features/shared/components/Loading';
import store, { persistor } from './store';

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<Loading />}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;