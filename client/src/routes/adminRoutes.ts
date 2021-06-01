import AdminDashboard from '../components/admin/AdminDashboard';
import UserList from '../components/admin/UserList';
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
  component: UserList,
  layout: AdminLayout
}];

export default adminRoutes;