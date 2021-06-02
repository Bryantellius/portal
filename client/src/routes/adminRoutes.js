import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ViewUsers from '../views/admin/user/ViewUsers';
import EditUser from '../views/admin/user/EditUser';
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
}];

export default adminRoutes;