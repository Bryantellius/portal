import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import AdminSidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/shared/Navbar";

const AdminLayout: FunctionComponent<IAdminLayoutProps> = ({
  children,
  isLoggedIn,
  setIsLoggedIn,
  user
}) => {
  return (
    <main className="docs">
      {/* Nav */}
      <Navbar
        user={user}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <AdminSidebar />
      <Container fluid>
        {children}
      </Container>
    </main>
  );
};

interface IAdminLayoutProps {
  children?: any;
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  user: any;
}

export default AdminLayout;
