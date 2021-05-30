import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import AdminSidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/shared/Navbar";

const AdminLayout: FunctionComponent<IAdminLayoutProps> = ({
  children,
  user
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Navbar
        user={user}
      />
      <AdminSidebar />
      <Container fluid className="content-with-sidebar px-0">
        {children}
      </Container>
    </main>
  );
};

interface IAdminLayoutProps {
  children?: any;
  user: any;
}

export default AdminLayout;
