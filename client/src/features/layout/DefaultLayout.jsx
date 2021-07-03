import React from "react";
import AppNavbar from "./AppNavbar";

import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const DefaultLayout = ({
  children
}) => {
  return (
    <main className="main">
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <AppNavbar />
        </Header>
        <Content style={{padding: '25px'}}>
          {children}
        </Content>
        <Footer />
      </Layout>
    </main>
  );
};

export default DefaultLayout;
