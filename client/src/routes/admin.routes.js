import AdminLayout from '../features/layout/AdminLayout';
import AdminDashboard from '../features/admin/AdminDashboard.page';
import ViewUsers from '../features/user/admin/ViewUsers';
import ViewCourses from '../features/course/admin/ViewCourses';
import EditUser from '../features/user/admin/EditUser';
import EditCourse from '../features/course/admin/EditCourse';
import ViewModules from '../features/module/admin/ViewModules';
import EditModule from '../features/module/admin/EditModule';
import ViewExerciseSubmissionsPage from '../features/exercise/admin/ViewExerciseSubmissions.page';
import ViewExerciseSubmissionCommentsPage from '../features/exercise/review/ViewExerciseSubmissionComments.page';
import ViewQuizzes from '../features/quiz/admin/ViewQuizzes';
import EditQuiz from '../features/quiz/admin/EditQuiz';

const adminRoutes = [
  {
    path: '/admin',
    key: 'admin.dashboard',
    exact: true,
    component: AdminDashboard,
    layout: AdminLayout
  },
  {
    path: '/admin/users',
    key: 'admin.user.list',
    exact: true,
    component: ViewUsers,
    layout: AdminLayout
  },
  {
    path: '/admin/users/:id',
    key: 'admin.user.edit',
    component: EditUser,
    layout: AdminLayout
  },
  {
    path: '/admin/courses',
    key: 'admin.course.list',
    exact: true,
    component: ViewCourses,
    layout: AdminLayout
  },
  {
    path: '/admin/courses/:id',
    key: 'admin.course.edit',
    exact: true,
    component: EditCourse,
    layout: AdminLayout
  },
  {
    path: '/admin/modules',
    key: 'admin.module.list',
    exact: true,
    component: ViewModules,
    layout: AdminLayout
  },
  {
    path: '/admin/modules/:id',
    key: 'admin.module.edit',
    component: EditModule,
    layout: AdminLayout
  },
  {
    path: '/admin/exercise/review',
    key: 'admin.exercise.review',
    component: ViewExerciseSubmissionsPage,
    layout: AdminLayout
  },
  {
    path: `/exercise/review/:submissionId`,
    key: 'admin.exercise.review.detail',
    component: ViewExerciseSubmissionCommentsPage,
    layout: AdminLayout
  },
  {
    path: `/admin/quizzes/:id?`,
    key: 'admin.quiz.edit',
    component: EditQuiz,
    layout: AdminLayout
  },
  {
    path: `/admin/quizzes`,
    key: 'admin.quiz.list',
    exact: true,
    component: ViewQuizzes,
    layout: AdminLayout
  }
];

export default adminRoutes;