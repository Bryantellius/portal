import React from 'react';
import { Button } from 'react-bootstrap';

const SignOutButton = () => {
  // todo: logout with store
  const onSignOut = () => {
    logout();
  };
  return (
    <Button variant="primary" onClick={onSignOut}>Sign Out</Button>
  );
};

export default SignOutButton;