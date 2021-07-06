import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    isLoading
  } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }

    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isLoading, history, isAuthenticated, loginWithRedirect]);

  return (
    <></>
  );
};

export default Login;