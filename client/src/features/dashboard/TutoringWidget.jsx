import React from 'react';
import { Card, Button } from 'antd';
import { green } from '@ant-design/colors';
import { Link } from 'react-router-dom';

const TutoringWidget = () => {
  return (
    <Card
      bodyStyle={{ backgroundColor: '#fff' }}
      style={{ backgroundColor: green.primary }}
      className="tutoring-widget"
      cover={
        <img
          src="/assets/svg/experts.svg"
          alt="One on Ones"
        />
      }
    actions={[
      <Button
        key="1-on-1"
        type="primary"
        href="/tutoring">
        Schedule 1-on-1
      </Button>
    ]}>
      <Card.Meta title="Tutoring" />
    </Card>
  );
};

export default TutoringWidget;