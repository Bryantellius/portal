import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from './index';
import DefaultLayout from '../features/layout/DefaultLayout';
import AuthorizedRoute from '../features/auth/AuthorizedRoute';
import AuthContainer from '../features/auth/AuthContainer';

const RouteWithLayout = ({
  path,
  redirect,
  allowAnonymous,
  component: Component,
  layout: Layout = DefaultLayout,
  ...props
}) => {
  if (redirect) {
     return <Route path={path} render={() => (
       <Redirect to={redirect} />
      )}
     />
  }

  return allowAnonymous
    ? <Route
        path={path} {...props} component={() =>
      <Layout>
        <Component />
      </Layout>
    }/>
    : <AuthorizedRoute path={path} {...props} component={() =>
        <AuthContainer>
          <Layout {...props}>
            <Component {...props } />
          </Layout>
        </AuthContainer>
      }
    />;
};

const Routes = () => {
  return (
    <Switch>
      {
        routes.map((route, index) => <RouteWithLayout path={route.path} key={index} {...route} />)
      }
    </Switch>
  );
};

export default Routes;