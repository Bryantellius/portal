import React, { Fragment, useEffect } from 'react';
import authService from './auth.service';

const LoginPage = () => {
  useEffect(() => {
    authService.login();
  }, []);
  return (
    <Fragment />
  );
};

export default LoginPage;