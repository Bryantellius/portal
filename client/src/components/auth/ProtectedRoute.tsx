import React, { FunctionComponent } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import DefaultLayout from '../layout/DefaultLayout';

interface IProtectedRouteProps {
  path: string,
  component?: any,
  layout?: any,
  exact: boolean,
  redirect?: string
}

type Props = IProtectedRouteProps;

const ProtectedRoute: FunctionComponent<Props> = ({
  path,
  component,
  layout,
  exact,
  redirect,
  ...args
}) => {
  const user = useAppSelector(state => state.auth.user);
  const isAuthenticated = !!user;
  const RouteLayout = layout || DefaultLayout;
  const RouteComponent = component;

  return (
    <Route path={path} render={ props => isAuthenticated ? <RouteLayout><RouteComponent { ...args } /></RouteLayout> : <Redirect to={'/login'} /> } />
  );
};

export default ProtectedRoute;