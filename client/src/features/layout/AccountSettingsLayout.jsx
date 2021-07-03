import React from 'react';
import AccountSettingsSidebar from '../user/account/AccountSettingsSidebar';
import AccountSettingsContainer from '../user/account/AccountSettingsContainer';
import { Layout } from 'antd';
import AppNavbar from './AppNavbar';
import CourseSidebar from '../course/CourseSidebar';
import styled from 'styled-components';

const {
  Header,
  Content,
  Footer,
} = Layout;

const AccountSettingsLayout = ({
  children
}) => {
  return (
    <main className="main">
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Header style={{ position: 'fixed', width: '100%', height: '75px' }}>
          <AppNavbar />
        </Header>
        <Layout style={{ overflowY: 'hidden' }}>
          <SidebarContainer>
            <AccountSettingsSidebar />
          </SidebarContainer>
          <ContentContainer>
            {children}
          </ContentContainer>
          <Footer />
        </Layout>
      </Layout>
    </main>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  height: 100vh;
  left: 0;
  top: ${({ theme }) => theme.layouts.default.topNav.height };
  width: ${({  theme }) => theme.layouts.account.sidebar.width };
  overflow-y: auto;
  background-color: #fff;
  padding: 0;
`;

const ContentContainer = styled.div`
  padding: 30px;
  position: relative;
  left: ${({  theme }) => theme.layouts.account.sidebar.width };
  top: ${({ theme }) => theme.layouts.default.topNav.height };
  height: ${({ theme }) => `calc(100vh - ${ theme.layouts.default.topNav.height })`}; 
  width: ${({ theme }) => `calc(100vw - ${ theme.layouts.account.sidebar.width })`};
  background-color: #efeeee;
  overflow-y: auto;
`

export default AccountSettingsLayout;