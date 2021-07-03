import React, { useEffect } from 'react';
import { useAuth } from './auth';

const LoginCallback = () => {
  const {
    user
  } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user])
  return (
    <>
    </>
  );
};

export default LoginCallback;