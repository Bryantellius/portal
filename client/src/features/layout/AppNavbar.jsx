import React, { Fragment, useState } from 'react';
import { Menu, Row, Col } from 'antd';
import { AccountBookOutlined, HomeOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AppNavbar = ({
  isLoggedIn
}) => {
  const [current, setCurrent] = useState();
  const user = useSelector(state => state.auth.user);
  const history = useHistory();

  const handleClick = e => {
    setCurrent(e.key);
    history.push(e.key);
  };

  return (
    <Row justify="space-between">
      <Col flex="100px">
        <img style={{ maxWidth: '200px'}} src="/assets/TrueCodersLogo_Inline.png" alt="TrueCoders" />
      </Col>
      <Col className="float-left">
        <Menu theme="dark" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/learn" icon={<ReadOutlined />}>
            Learn
          </Menu.Item>
        </Menu>
      </Col>
      {
        isLoggedIn && (
          <Col className="float-right">
            <Menu theme="dark" mode="horizontal" direction="rtl">
              <Menu.SubMenu icon={ <UserOutlined /> }>
                {
                  user?.role && user?.role === 'Admin' || user?.role === 'Instructor' && (
                    <Menu.Item key="/admin">
                      Admin
                    </Menu.Item>
                  )
                }
                <Menu.Item key="/user/profile">
                  User Profile
                </Menu.Item>
                <Menu.Item key="/account">
                  Account
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        )
      }
    </Row>
  );
};

export default AppNavbar;
