import CareerServices from '../features/career-services/CareerServices.page';
import Tutoring from '../features/tutoring/Tutoring.page';
import CourseLayout from '../features/course/layout/CourseLayout';
import Dashboard from '../features/dashboard/Dashboard.page';
import UserAdditionalInfo from '../features/user/UserAdditionalData.page';
import ViewVideos from '../features/video/ViewVideos.page';
import LectureContainer from '../features/lecture/Lecture.container';
import AccountSettingsLayout from '../features/layout/AccountSettingsLayout';
import Profile from '../features/user/Profile';
import ConnectedAccounts from '../features/user/account/ConnectedAccounts';

const appRoutes = [
  {
    path: '/dashboard',
    key: 'app.dashboard',
    exact: true,
    component: Dashboard
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
    key: 'app.course.view',
    component: LectureContainer,
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