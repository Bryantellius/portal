import React from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faShareAltSquare,
  faBullhorn
} from '@fortawesome/free-solid-svg-icons';

const AccountSettingsSidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <h3>Account Settings</h3>
      </SidebarHeader>
      <Nav activeKey={window.location.pathname} defaultActiveKey="/user/profile" className="flex-column pt-2">
        <Nav.Item>
          <Nav.Link className="text-white" href="/user/profile">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            User Profile
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className="text-white" href="/admin/users">
            <FontAwesomeIcon icon={faShareAltSquare} className="mr-2" />
            Connected Accounts
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className="text-white" href="/user/subscriptions">
            <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
            Subscriptions
          </Nav.Link>
        </Nav.Item>
       </Nav>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  min-width: ${({ theme }) => theme.layouts.account.sidebar.width };
  max-width: ${({ theme }) => theme.layouts.account.sidebar.width };
  height: ${({ theme }) => theme.layouts.account.sidebar.height };
  background: ${({ theme }) => theme.layouts.account.sidebar.backgroundColor };
  color: ${({ theme }) => theme.layouts.account.sidebar.textColor };
  transition: all 0.5s;
`;

const SidebarHeader = styled.div`
  background: #313b4c;
  color: #adb5bd;
  
  & h3 {
    color: #fff;
    padding: 1em;
  }
  
  & button {
    position: relative;
    float: right;
    margin: 0.5em;
    font-size: 2rem;
    cursor: pointer;
    display: none;
  }
  
  & ul p {
    color: #fff;
    padding: 10px;
  }
`;

export default AccountSettingsSidebar;