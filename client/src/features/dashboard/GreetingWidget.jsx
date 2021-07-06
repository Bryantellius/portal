import React from 'react';
import { Card } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const GreetingWidget = () => {
  const user = useSelector(state => state.auth.user);
  const {
    user: auth0User
  } = useAuth0();

  return (
    <Card>
      {
        (user?.firstName || auth0User?.given_name) &&
        <Card.Meta
          title={`Welcome back, ${user?.firstName || auth0User?.given_name}`}
          description={`Member Since: ${moment(user?.createdAt).format('MM-DD-YYYY')}`} />
      }
    </Card>
  );
};

export default GreetingWidget;