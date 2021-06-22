import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthorizedRoute = ({
  isAuthenticated,
  ...props
}) => {

  return isAuthenticated
    ? <Route { ...props } />
    : <Redirect to="/login" />
};

export default AuthorizedRoute;