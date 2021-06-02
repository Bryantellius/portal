import React  from 'react';
import { Container } from 'react-bootstrap';
import AdminSidebar from '../admin/AdminSidebar';
import Header from './Header';
import './AdminLayout.scss';

const AdminLayout = ({
  children
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Header />
      <AdminSidebar />
      <Container fluid className="content-with-sidebar px-0">
        {children}
      </Container>
    </main>
  );
};

export default AdminLayout;
