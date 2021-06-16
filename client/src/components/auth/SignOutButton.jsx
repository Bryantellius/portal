import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../store/auth/authSlice';

const SignOutButton = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(logoutSuccess());
    logout();
  };
  return (
    <Button variant="secondary" onClick={onSignOut}>Sign Out</Button>
  );
};

export default SignOutButton;