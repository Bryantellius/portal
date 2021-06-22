import React, { useEffect } from 'react';
import authService from './auth.service';
const Login = () => {
  useEffect(() => {
    authService.login();
  }, []);
  return (
    <>

    </>
  );
};

export default Login;