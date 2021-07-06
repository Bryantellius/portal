import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import appConfig from '../../config/appConfig';

const AuthProvider = ({ children }) => {
  const onRedirectCallback = () => {
    console.log('redirected after auth0 login');
  };

  return (
    <Auth0Provider
      domain={appConfig.auth0.domain}
      clientId={appConfig.auth0.clientId}
      audience={appConfig.auth0.audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;