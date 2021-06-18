import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import appConfig from '../../config/appConfig';
import { setToken } from '../../features/auth/reducers/authReducer';
import { useDispatch } from 'react-redux';

const SignInButton = () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const onSignIn = async () => {
    await loginWithRedirect();
    const accessToken = await getAccessTokenSilently({
      audience: appConfig.auth0ApiUrl,
      scope: 'read:current_user'
    });

    dispatch(setToken(accessToken));
  };

  return (
    <Button variant="primary" onClick={onSignIn}>Sign In</Button>
  );
};

export default SignInButton;