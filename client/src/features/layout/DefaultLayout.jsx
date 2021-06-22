import React from "react";
import AppNavbar from "./AppNavbar";
import { useSelector } from 'react-redux';

import { Layout } from 'antd';
import App from '../../App';

const { Header, Footer, Sider, Content } = Layout;

const DefaultLayout = ({
  children
}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <main className="main">
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <AppNavbar />
        </Header>
        <Content style={{padding: '50px'}}>
          {children}
        </Content>
        <Footer>

        </Footer>
      </Layout>
    </main>
  );
};

export default DefaultLayout;
