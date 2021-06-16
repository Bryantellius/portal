import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '../components/shared/Loading';
import store, { persistor } from './store';

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;