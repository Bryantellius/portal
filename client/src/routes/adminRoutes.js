import AdminDashboard from '../components/admin/AdminDashboard';
import ViewUsers from '../views/admin/user/ViewUsers';
import AdminLayout from '../components/layout/AdminLayout';

const adminRoutes = [{
  path: '/admin',
  key: 'admin.dashboard',
  exact: true,
  component: AdminDashboard,
  layout: AdminLayout
}, {
  path: '/admin/users',
  key: 'admin.users',
  exact: true,
  component: ViewUsers,
  layout: AdminLayout
}];

export default adminRoutes;