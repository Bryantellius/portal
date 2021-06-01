import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from './index';
import DefaultLayout from '../components/layout/DefaultLayout';

const RouteWithLayout: FunctionComponent<any> = (route: any) => {
  const Layout = route.layout || DefaultLayout;
  const Component = route.component;
  return (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      render={props => route.redirect
        ? (
          <Redirect to={route.redirect} />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
    />
  );
};


const Routes: FunctionComponent = () => {
  return (
    <Switch>
      {routes.map(RouteWithLayout)}
    </Switch>
  );
};

export default Routes;