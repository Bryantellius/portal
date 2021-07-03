import React from "react";
import AppNavbar from "./AppNavbar";

import { Layout } from 'antd';
import AdminSidebar from '../admin/AdminSidebar';

const { Header, Footer, Content } = Layout;

const AdminLayout = ({
  children
}) => {
  return (
    <main className="main">
      <Layout style={{ position:'absolute', left: '250px', minHeight:'100vh', width: "calc(100vw - 250px)" }}>
      <AdminSidebar />
        <Header>
          <AppNavbar />
        </Header>
        <Content style={{padding: '0 25px'}}>
          {children}
        </Content>
        <Footer />
      </Layout>
    </main>
  );
};

export default AdminLayout;
