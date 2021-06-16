import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ViewUsers from '../views/admin/user/ViewUsers';
import ViewCourses from '../views/admin/course/ViewCourses';
import EditUser from '../views/admin/user/EditUser';
import EditCourse from '../views/admin/course/EditCourse';
import ViewModules from '../views/admin/module/ViewModules';
import EditModule from '../views/admin/module/EditModule';
const adminRoutes = [{
  path: '/admin',
  key: 'admin.dashboard',
  exact: true,
  component: AdminDashboard,
  layout: AdminLayout
}, {
  path: '/admin/users',
  key: 'admin.user.index',
  exact: true,
  component: ViewUsers,
  layout: AdminLayout
}, {
  path: '/admin/users/:id',
  key: 'admin.user.edit',
  component: EditUser,
  layout: AdminLayout
}, {
  path: '/admin/courses',
  key: 'admin.course.index',
  exact: true,
  component: ViewCourses,
  layout: AdminLayout
}, {
  path: '/admin/courses/:id',
  key: 'admin.course.edit',
  exact: true,
  component: EditCourse,
  layout: AdminLayout
}, {
  path: '/admin/modules',
  key: 'admin.module.index',
  exact: true,
  component: ViewModules,
  layout: AdminLayout
}, {
  path: '/admin/modules/:id',
  key: 'admin.module.edit',
  component: EditModule,
  layout: AdminLayout
}];

export default adminRoutes;