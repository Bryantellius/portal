import DefaultLayout from '../features/layout/DefaultLayout';
import EmptyLayout from '../features/layout/EmptyLayout';
import Login from '../features/auth/Login';
import LoginCallback from '../features/auth/LoginCallback';

const authRoutes = [
  {
    path: '/login',
    exact: true,
    component: Login,
    layout: EmptyLayout,
    allowAnonymous: true
  },
  {
    path: '/loginCallback',
    exact: true,
    component: LoginCallback,
    allowAnonymous: true,
    layout: EmptyLayout
  }
];

export default authRoutes;