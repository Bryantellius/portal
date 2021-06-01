import Login from '../views/Login';
import SignUp from '../views/SignUp';

const adminRoutes = [{
  path: '/login',
  key: 'login',
  exact: true,
  component: Login
}, {
  path: '/signup',
  key: 'signUp',
  exact: true,
  component: SignUp
}];

export default adminRoutes;