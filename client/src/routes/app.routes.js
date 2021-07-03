import CareerServices from '../features/career-services/CareerServices.page';
import Tutoring from '../features/tutoring/Tutoring.page';
import CourseLayout from '../features/course/layout/CourseLayout';
import Dashboard from '../features/dashboard/Dashboard.page';
import UserAdditionalInfo from '../features/user/UserAdditionalData.page';
import ViewVideos from '../features/video/ViewVideos.page';
import ViewCoursePage from '../features/course/ViewCourse.page';
import AccountSettingsLayout from '../features/layout/AccountSettingsLayout';
import Profile from '../features/user/Profile';
import ConnectedAccounts from '../features/user/account/ConnectedAccounts';
import PrivacyPolicy from '../features/privacy/PrivacyPolicy.page';
import TermsAndConditions from '../features/terms-and-conditions/TermsAndConditions.page';
import ViewCoursesPage from '../features/course/ViewCourses.page';
import HomePage from '../features/home/Home.page';
import DefaultLayout from '../features/layout/DefaultLayout';

const appRoutes = [
  {
    path: '/',
    key: 'app.home',
    exact: true,
    component: HomePage,
    layout: DefaultLayout,
    allowAnonymous: true
  },
  {
    path: '/dashboard',
    key: 'app.dashboard',
    exact: true,
    component: Dashboard,
    layout: DefaultLayout
  },
  {
    path: '/privacy',
    key: 'app.privacy-policy',
    component: PrivacyPolicy,
    exact: true
  },
  {
    path: '/terms-and-conditions',
    key: 'app.terms-and-conditions',
    component: TermsAndConditions,
    exact: true
  },
  {
    path: '/additional-info',
    key: 'app.user.additional-info',
    exact: true,
    component: UserAdditionalInfo
  },
  {
    path: '/user/profile',
    key: 'app.account-settings.profile',
    layout: AccountSettingsLayout,
    component: Profile
  },
  {
    path: '/user/connected-accounts',
    key: 'app.account-settings.connected-accounts',
    layout: AccountSettingsLayout,
    component: ConnectedAccounts
  },
  {
    path: '/learn',
    exact: true,
    component: ViewCoursesPage
  },
  {
    path: '/course/:courseId',
    key: 'app.course.view',
    exact: false,
    component: ViewCoursePage,
    layout: CourseLayout
  },
  {
    path: '/career-services',
    key: 'app.career-services',
    exact: true,
    component: CareerServices
  },
  {
    path: '/tutoring',
    key: 'app.tutoring',
    exact: true,
    component: Tutoring
  },
  {
    path: '/videos',
    key: 'app.videos.search',
    exact: true,
    component: ViewVideos
  }
];

export default appRoutes;