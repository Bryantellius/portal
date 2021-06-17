import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from './index';
import DefaultLayout from '../components/layout/DefaultLayout';
import { useSelector } from 'react-redux';

const RouteWithLayout = route => {
  const Layout = route.layout || DefaultLayout;
  const Component = route.component;

  return (
      <Route
        key={ route.path }
        path={ route.path }
        exact={ route.exact }
        render={ props => route.redirect
          ? (
            <Redirect to={ route.redirect } />
          ) : (
            <Layout>
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
      {routes.map(RouteWithLayout)}
    </Switch>
  );
};

export default Routes;