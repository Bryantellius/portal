import React, { useEffect } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Routes from './routes/Routes';
import ApiClient from './utils/apiClient';
import './App.scss';
import { useDispatch, useSelector } from "react-redux";
import { setModules } from "./store/module/moduleReducer";
import * as authService from './utils/AuthService';
import { loginError, loginRequest, loginSuccess } from './store/auth/authSlice';
import { useHistory } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    authService.lock.on('authenticated', authResult => {
      dispatch(loginRequest());
      authService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return dispatch(loginError(error));
        }

        dispatch(loginSuccess({ user: profile, token: authResult.accessToken }));
        authService.lock.hide();

        if (!(profile.firstName && profile.lastName)) {
          history.push('/additional-info');
        } else {
          history.push('/dashboard');
        }
      });
    });

    authService.lock.on('authorization_error', error => {
      dispatch(loginError(error));
      history.push('/');
    });

    if (!isAuthenticated) {
      authService.lock.show();
    }
  }, [isAuthenticated, authService.lock, dispatch]);

  useEffect(() => {
    const fetchModules = async () => {
      const apiClient = new ApiClient();
      //todo: only fetch user modules
      const moduleResponse = await apiClient.get(`/module`);
      dispatch(setModules(moduleResponse));
    };

    if (isAuthenticated) {
      fetchModules();
    }
  }, [isAuthenticated, dispatch]);

  return (
      <Router>
        <Routes />
      </Router>
  );
};

export default App;
