import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from './index';
import DefaultLayout from '../features/layout/DefaultLayout';
import { useSelector } from 'react-redux';

const GetRouteWithLayout = route => {
  const Layout = route.layout || DefaultLayout;
  const Component = route.component;
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
      <Route
        key={ route.path }
        path={ route.path }
        exact={ route.exact }
        render={ props => route.redirect
          ? (
            <Redirect to={ route.redirect } />
          ) : (
            route.requireAuth && !isAuthenticated
              ? <Redirect to={ '/login' } />
              : <Layout>
                  <Component { ...props } />
                </Layout>
          )
        }
      />
  );
};

const Routes = ({ children }) => {
  return (
    <Switch>
      {routes.map(route => GetRouteWithLayout(route))}
    </Switch>
  );
};

export default Routes;