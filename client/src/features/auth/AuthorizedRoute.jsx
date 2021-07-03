import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const AuthorizedRoute = ({
  component: Component,
  path,
  exact,
}) => {
  return <Route path={ path } exact={!!exact} component={withAuthenticationRequired(Component)} />
};

export default AuthorizedRoute;