import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { doLogout } from './auth.slice';

const SignOutButton = () => {
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch( doLogout);
  };
  return (
    <Button variant="secondary" onClick={onSignOut}>Sign Out</Button>
  );
};

export default SignOutButton;