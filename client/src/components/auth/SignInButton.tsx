import React, { FunctionComponent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const SignInButton: FunctionComponent = () => {
  const { loginWithRedirect } = useAuth0();
  const onSignIn = () => {
    loginWithRedirect();
  };
  return (
    <Button variant="primary" onClick={onSignIn}>Sign In</Button>
  );
};

export default SignInButton;