import React from 'react';
import { Card } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';

const GreetingWidget = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <Card>
      <Card.Meta
        title={`Welcome back, ${ user?.firstName }`}
        description={`Member Since: ${ moment(user?.createdAt).format('MM-DD-YYYY') }`}
        />
    </Card>
  );
};

export default GreetingWidget;