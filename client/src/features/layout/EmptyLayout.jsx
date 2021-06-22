import React from "react";
import AppNavbar from "./AppNavbar";
import { useSelector } from 'react-redux';

import { Layout } from 'antd';
import App from '../../App';

const { Header, Footer, Sider, Content } = Layout;

const DefaultLayout = ({
  children
}) => {
  return (
    <main className="main">
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <AppNavbar isLoggedIn={false} />
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
