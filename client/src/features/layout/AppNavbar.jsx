import React, { useEffect, useState } from 'react';
import { Menu, Row, Col } from 'antd';
import { HomeOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateToken, updateUser } from '../auth/auth.slice';
import { useAuth } from '../auth/auth';

const AppNavbar = () => {
  const [current, setCurrent] = useState();
  const {
    logout,
    isAuthenticated,
    loginWithRedirect
  } = useAuth();

  const user = useSelector(state => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = e => {
    setCurrent(e.key);
    history.push(e.key);
  };

  const signOut = () => {
    dispatch(updateToken(null));
    dispatch(updateUser(null));
    logout();
  };

  return (
    <Row justify="space-between">
      <Col flex="100px">
        <img style={{ maxWidth: '200px'}} src="/assets/TrueCodersLogo_Inline.png" alt="TrueCoders" />
      </Col>
      {
        isAuthenticated ? (
          <>
            <Col flex="auto" className="float-left">
              <Menu theme="dark" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
                  Dashboard
                </Menu.Item>
                <Menu.Item key="/learn" icon={<ReadOutlined />}>
                  Learn
                </Menu.Item>
              </Menu>
            </Col>
            <Col flex="100px" style={{ pull: 'right' }}>
              <Menu theme="dark" mode="horizontal" direction="ltr" onClick={handleClick}>
                <Menu.SubMenu
                  key="profile"
                  icon={ <UserOutlined className="" /> }
                  title="Account"
                  popupOffset={[0, 0]}>
                  {
                    user?.role && (user?.role?.title === 'Admin' || user?.role?.title === 'Instructor') && (
                      <Menu.Item key="/admin">
                        Admin
                      </Menu.Item>
                    )
                  }
                  <Menu.Item key="/user/profile">
                    User Profile
                  </Menu.Item>
                  <Menu.Item key="/user/connected-accounts">
                    Account
                  </Menu.Item>
                  <Menu.Item key="/user/logout" onClick={signOut}>
                    Sign Out
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </Col>
          </>
          ) : (
          <Col flex="100px" style={{ pull: 'right' }}>
            <Menu theme="dark" mode="horizontal" selectedKeys={[current]} direction="ltr" onClick={handleClick}>
              <Menu.Item key="/user/logout" onClick={() => loginWithRedirect()}>
                Sign In
              </Menu.Item>
            </Menu>
          </Col>
        )
      }
    </Row>
  );
};

export default AppNavbar;
