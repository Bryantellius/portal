import adminRoutes from './adminRoutes';
import CareerServices from '../views/CareerServices';
import Learn from '../views/Learn';
import CourseLayout from '../components/layout/CourseLayout';
import Profile from '../views/Profile';
import Tutoring from '../views/Tutoring';
import Dashboard from '../views/Dashboard';
import UserAdditionalInfo from '../views/UserAdditionalData';
import ViewVideos from '../views/ViewVideos';

const appRoutes = [{
  path: '/career-services',
  key: 'career-services',
  exact: true,
  component: CareerServices
}, {
  path: '/tutoring',
  key: 'tutoring',
  exact: true,
  component: Tutoring
}, {
  path: '/learn',
  key: 'learn',
  component: Learn,
  layout: CourseLayout
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
  path: '/additional-info',
  key: 'user.additional-info',
  exact: true,
  component: UserAdditionalInfo
}, {
  path: '/user/profile',
  key: 'user.profile',
  exact: true,
  component: Profile
}, {
  path: '/videos',
  key: 'videos',
  exact: true,
  component: ViewVideos
}];

appRoutes.push({
  path: '*',
  exact: false,
  redirect: '/dashboard'
});

const routes = [
  ...adminRoutes,
  ...appRoutes
];

export default routes;