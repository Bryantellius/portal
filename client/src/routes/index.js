import appRoutes from './app.routes';
import adminRoutes from './admin.routes';

const defaultRoute = {
  path: '*',
  exact: false,
  redirect: '/dashboard'
};

const routes = [
  ...appRoutes,
  ...adminRoutes,
  defaultRoute
];

export default routes;