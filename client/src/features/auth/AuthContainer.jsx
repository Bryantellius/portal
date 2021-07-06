import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import authService from './auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken, updateUser } from './auth.slice';
import { useLocation } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import appConfig from '../../config/appConfig';

const AuthContainer = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.auth.user);
  const {
    isLoading,
    user: auth0User,
    getAccessTokenSilently
  } = useAuth0();

  useEffect(() => {
    const handleRedirects = async () => {
      if (isLoading) {
        return;
      }

      if (!auth0User) {
        return;
      }

      const result = await getAccessTokenSilently({
        audience: appConfig.auth0.apiUrl,
        scope: 'openid email profile'
      });

      if (result) {
        authService.setToken(result);
        dispatch(updateToken(result));
      }

      if (!(user?.firstName && user?.lastName)) {

        if (!auth0User?.sub) {
          return;
        }
        const apiUser = await authService.getApiUser(auth0User.sub);
        if (apiUser) {
          dispatch(updateUser({
            ...user,
            ...apiUser
          }));
        }

        if (!(apiUser?.firstName && apiUser?.lastName) && history.location.pathname !== '/additional-info') {
          history.push('/additional-info');
        }
      }
    };

    handleRedirects();
  }, [auth0User, isLoading, user?.firstName, user?.lastName, history, dispatch, location]);

  return (
    <>
      {children}
    </>
  );
};

export default AuthContainer;