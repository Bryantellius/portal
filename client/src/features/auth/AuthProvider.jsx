import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Auth0Provider from './Auth0Provider';
import { useDispatch, useSelector } from 'react-redux';
import { default as AuthContext } from './authContext';
import appConfig from '../../config/appConfig';
import authService from './auth.service';
import { updateUser } from './auth.slice';

const AuthProvider = ({
  children
}) => {
  const auth0 = useAuth0();
  const {
    getAccessTokenSilently
  } = auth0;

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const updateContactInfo = async userData => {
    const currentToken = authService.getToken();

    const accessToken = await getAccessTokenSilently({
      audience: appConfig.auth0.apiUrl,
      scope: 'update:users update:users_app_metadata update:current_user_metadata'
    });

    localStorage.setItem('token', accessToken);

    const updatedUser = await authService.updateUserContactInfo(auth0.user.sub, userData);

    authService.setToken(currentToken);

    return updatedUser;
  }

  const logout = async () => {
    localStorage.clear();
    await auth0.logout({
      returnTo: appConfig.siteUrl
    });
  };

  const auth = {
    ...auth0,
    updateContactInfo,
    logout
  };

  useEffect(() => {

    const saveUser = async () => {
      await dispatch(updateUser({
        ...auth0.user,
      }))
    };

    if (auth0.user && auth0.user.sub) {
      saveUser();
    }
  }, [auth0.user, dispatch]);

  return(
    <AuthContext.Provider
      value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

const AuthProviderWrapper = ({
  children
}) => {
  return (
    <Auth0Provider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Auth0Provider>
  )
};

export default AuthProviderWrapper;