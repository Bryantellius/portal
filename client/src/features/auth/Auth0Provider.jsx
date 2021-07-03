import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import appConfig from '../../config/appConfig';
import { useHistory } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const onRedirectCallback = appState => {

    history.push(appState?.returnTo || '/');
  };

  return (
    <Auth0Provider
      domain={appConfig.auth0.domain}
      clientId={ appConfig.auth0.clientId }
      audience={appConfig.auth0.audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
}

export default AuthProvider;