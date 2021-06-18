import React, { useEffect } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Routes from './routes/Routes';
import './App.scss';
import { useDispatch } from 'react-redux';
import { doLogin  } from './features/auth/auth.slice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doLogin());
  }, [dispatch]);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
