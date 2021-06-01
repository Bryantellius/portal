import React, { FunctionComponent, ReactNode } from 'react';
import { Container } from "react-bootstrap";
import AdminSidebar from "../admin/AdminSidebar";
import Header from "./Header";

const AdminLayout: FunctionComponent<IAdminLayoutProps> = ({
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

interface IAdminLayoutProps {
  children?: ReactNode;
}

export default AdminLayout;
