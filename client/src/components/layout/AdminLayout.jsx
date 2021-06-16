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
      <AdminSidebar />
      <div className="content-with-sidebar">
        <Container fluid className="px-0">
          {children}
        </Container>
      </div>
    </main>
  );
};

export default AdminLayout;
