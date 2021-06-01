import adminRoutes from './adminRoutes';
import authRoutes from './authRoutes';
import CareerServices from '../views/CareerServices';
import Lecture from '../views/Lecture';
import LectureLayout from '../components/layout/LectureLayout';
import Profile from '../views/Profile';
import Tutoring from '../views/Tutoring';
import Dashboard from '../views/Dashboard';

const appRoutes = [{
  path: '/career-services',
  key: 'career-services',
  exact: true,
  component: CareerServices
}, {
  path: '/learn',
  key: 'learn',
  exact: true,
  component: Lecture,
  layout: LectureLayout
}, {
  path: '/tutoring',
  key: 'tutoring',
  exact: true,
  component: Tutoring
}, {
  path: '/dashboard',
  key: 'dashboard',
  exact: true,
  component: Dashboard
}, {
    path: '/user/profile',
    key: 'user.profile',
    exact: true,
    component: Profile
}, {
  path: '*',
  exact: false,
  redirect: '/dashboard'
}];

const routes = [
  ...adminRoutes,
  ...authRoutes,
  ...appRoutes
];

export default routes;