import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import useAuth from './useAuth';

const Login = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    isLoading,
  } = useAuth();
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