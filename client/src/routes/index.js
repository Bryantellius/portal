import appRoutes from './app.routes';
import adminRoutes from './admin.routes';
import authRoutes from './auth.routes';

const defaultRoute = {
  path: '*',
  exact: false,
  redirect: '/',
};

const routes = [

  ...appRoutes,
  ...adminRoutes,
  ...authRoutes,
  defaultRoute
];

export default routes;