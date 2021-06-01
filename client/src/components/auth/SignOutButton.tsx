import React, { FunctionComponent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const SignOutButton: FunctionComponent = () => {
  const { logout } = useAuth0();
  const onSignOut = () => {
    logout();
  };
  return (
    <Button variant="primary" onClick={onSignOut}>Sign Out</Button>
  );
};

export default SignOutButton;