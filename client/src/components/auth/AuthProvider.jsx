import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import appConfig from '../../config/appConfig'
const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain={appConfig.auth0Domain}
      clientId={appConfig.auth0ClientId}
      redirectUri={window.location.origin}
      audience={appConfig.auth0ApiUrl}
      scope="read:current_user update:current_user_metadata">
      { children }
    </Auth0Provider>
  );
};

export default AuthProvider;
