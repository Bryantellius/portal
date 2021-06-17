import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect
} from 'react-router-dom';
import Routes from './routes/Routes';
import ApiClient from './utils/apiClient';
import './App.scss';
import { useDispatch, useSelector } from "react-redux";
import { setModules } from "./store/module/moduleReducer";
import * as authService from './utils/AuthService';
import {
  getTokenSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  updateUserProfileSuccess
} from './store/auth/authSlice';

import browserHistory from './routes/history';
import { useAuth0 } from '@auth0/auth0-react';
import appConfig from './config/appConfig';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated && !!state.auth.user);
  const user = useSelector(state => state.auth.user);
  const { getAccessTokenSilently, isLoading } = useAuth0();

  useEffect(() => {
    const updateAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        dispatch(getTokenSuccess(accessToken));
      } catch (err) {
        console.error(err);
        authService.lock.show();
      }
    };

    updateAccessToken();
  }, [dispatch]);

  useEffect(() => {
    authService.lock.on('authenticated', authResult => {
      dispatch(loginRequest());
      authService.lock.getUserInfo(authResult.accessToken, async (error, profile) => {
        if (error) {
          return dispatch(loginError(error));
        }

        dispatch(loginSuccess({ user: profile, token: authResult.accessToken }));

        const apiClient = new ApiClient();
        let userDetails = await apiClient.get(`/user/auth0/${ profile.sub }`);

        if (!userDetails) {
         userDetails = await apiClient.post('/user/link', {
           email: profile.email,
           auth0Id: profile.sub,
           avatarUrl: profile.picture
         });
        }

        const userData = {
          ...userDetails,
          email: profile.email,
          firstName: userDetails.firstName || profile.givenName,
          lastName: userDetails.lastName || profile.familyName,
          auth0Id: profile.sub,
          avatarUrl: profile.picture
        };

        dispatch(updateUserProfileSuccess(userData));
        authService.lock.hide();
      });
    });

    authService.lock.on('authorization_error', error => {
      dispatch(loginError(error));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      authService.lock.show();
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && (user.sub || user.auth0Id)) {
        const apiClient = new ApiClient();
        const userDetails = await apiClient.get(`/user/auth0/${ user.sub || user.auth0Id }`);

        dispatch(updateUserProfileSuccess(userDetails));
      }
    };

    fetchUserDetails();
  }, [user?.sub, user?.auth0Id, dispatch]);

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
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
};

export default App;
